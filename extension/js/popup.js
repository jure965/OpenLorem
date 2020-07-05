// Provider <select> change listener
document.getElementById("provider").onchange = function () {
    changeProvider(this.value);
    requestProviderChange(this.value);
};

// Display <button> click listener
document.getElementById("display").onclick = function () {
    requestNextLoremText();
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
    const providerSelect = document.getElementById("provider");
    providerSelect.innerHTML = ""; // clear html
    providers.forEach(function (provider) {
        const option = document.createElement("option");
        option.textContent = provider.name;
        option.value = provider.id;
        option.selected = provider.id === currentProviderId;
        providerSelect.appendChild(option);
    });
    changeProvider(currentProviderId);
}

function setLoremText(text) {
    document.getElementById("output").value = text;
}

function requestCurrentLoremText() {
    return browser.runtime.sendMessage({
        message: "currentLoremText",
    });
}

function requestNextLoremText() {
    return browser.runtime.sendMessage({
        message: "nextLoremText",
    });
}

function requestProviders() {
    return browser.runtime.sendMessage({
        message: "providers",
    }).then((response) => {
        populateProviders(response.providers, response.currentProviderId);
    });
}

function requestProviderChange(newProviderId) {
    return browser.runtime.sendMessage({
        message: "providerChange",
        newProviderId: newProviderId,
    });
}

function requestProviderOptionChange(option) {
    return browser.runtime.sendMessage({
        message: "providerOptionChange",
        option: option,
    });
}

function isCheckbox(element) {
    return (element || {}).type.toLowerCase() === "checkbox";
}

// load current lorem text on popup open
window.addEventListener("load", () => {
    requestProviders().then(() => {
        requestCurrentLoremText();
    });
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

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
        case "loremTextResponse":
            setLoremText(request.text);
            break;
        default:
            break;
    }
});
