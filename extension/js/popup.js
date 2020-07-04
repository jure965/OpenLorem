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

requestProviders().then(() => requestCurrentLoremText());

function changeProvider(newProvider) {
    document.querySelectorAll(".provider")
        .forEach(element => element.style.display = "none");
    document.getElementById(newProvider).style.display = "block";
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
}

function setLoremText(text) {
    document.getElementById("output").value = text;
}

function requestCurrentLoremText() {
    return browser.runtime.sendMessage({
        message: "currentLoremText",
    }).then((response) => {
        setLoremText(response);
    });
}

function requestNextLoremText() {
    return browser.runtime.sendMessage({
        message: "nextLoremText",
    }).then((response) => {
        setLoremText(response);
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
    }).then((response) => {

    });

}
