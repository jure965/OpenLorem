// Provider <select> change listener
document.getElementById("providerSelect").onchange = function () {
    changeProvider(this.value);
    requestProviderChange(this.value);
};

// overlay hiding
for (let overlay of document.getElementsByClassName("overlay")) {
    overlay.onclick = function (e) {
        if (e.target === this) {
            this.classList.add("hidden");
        }
    };
}

// close buttons
for (let close of document.getElementsByClassName("close")) {
    close.onclick = function () {
        this.parentElement.parentElement.classList.add("hidden");
    };
}

// info button
document.getElementById("info-button").onclick = function () {
    document.getElementById(this.dataset.target).classList.remove("hidden");
};

function changeProvider(providerId) {
    document.querySelectorAll(".provider")
        .forEach(element => element.style.display = "none");
    document.getElementById(providerId).style.display = "block";
}

function populateProviders(providers, currentProviderId) {
    const providerSelect = document.getElementById("providerSelect");
    providerSelect.innerHTML = ""; // clear html
    providers.forEach(function (provider) {
        const option = document.createElement("option");
        option.textContent = provider.name;
        option.value = provider.id;
        option.selected = provider.id === currentProviderId;
        providerSelect.appendChild(option);
        const optionsElement = document.querySelector(`form[data-provider=${provider.id}]`);
        Object.entries(provider.options).forEach((entry) => {
            const optionElement = optionsElement.querySelector(`input[name=${entry[0]}]`);
            if (optionElement) {
                if (isCheckbox(optionElement)) {
                    optionElement.checked = entry[1];
                } else {
                    optionElement.value = entry[1];
                }
            } else {
                // look for <select> element
                const selectElement = optionsElement.querySelector(`select[name=${entry[0]}]`);
                if (selectElement) {
                    selectElement.value = entry[1];
                }
            }
        });
    });
    changeProvider(currentProviderId);
}

function setLoremText(text) {
    document.getElementById("output").value = text;
}

function requestCurrentLoremText() {
    // return browser.runtime.sendMessage({
    return chrome.runtime.sendMessage({
        message: "currentLoremText",
    });
}

function requestNextLoremText() {
    // return browser.runtime.sendMessage({
    return chrome.runtime.sendMessage({
        message: "nextLoremText",
    });
}

function copyLoremText() {
    const output = document.querySelector("#output");
    navigator.clipboard.writeText(output.value).then(() => {
        document.querySelector("#copy").innerText = "Copied";
    });
}

// function requestProviders() {
function requestProviders(callback) {
    // return browser.runtime.sendMessage({
    return chrome.runtime.sendMessage({
        message: "providers",
    // }).then((response) => {
    }, (response) => {
        populateProviders(response.providers, response.currentProviderId);
        // added for chrome compatibility
        if (callback && typeof callback === "function") {
            callback();
        }
    });
}

function requestProviderChange(newProviderId) {
    // return browser.runtime.sendMessage({
    return chrome.runtime.sendMessage({
        message: "providerChange",
        newProviderId: newProviderId,
    });
}

function requestProviderOptionChange(option) {
    // return browser.runtime.sendMessage({
    return chrome.runtime.sendMessage({
        message: "providerOptionChange",
        option: option,
    });
}

function isCheckbox(element) {
    return (element || {}).type.toLowerCase() === "checkbox";
}

// load current lorem text on popup open
window.addEventListener("load", () => {
    // requestProviders().then(() => {
    requestProviders(() => {
        requestCurrentLoremText();
    });
});

document.querySelector("#generate").addEventListener("click", () => {
    requestNextLoremText();
});

document.querySelector("#copy").addEventListener("click", () => {
    copyLoremText();
});

function onFormChange(e) {
    requestProviderOptionChange({
        key: e.target.name,
        value: isCheckbox(e.target) ? e.target.checked : e.target.value,
        provider: e.currentTarget.dataset.provider,
    });
}

document.querySelectorAll("form").forEach((element) => {
    element.addEventListener("change", onFormChange);
});

// browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
        case "loremTextResponse":
            setLoremText(request.text);
            break;
        default:
            break;
    }
});

requestCurrentLoremText();
