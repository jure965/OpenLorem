import Loripsum from "./provider/Loripsum.js";
import SettingsStorage from "./SettingsStorage.js";
import ContextMenu from "./ContextMenu.js";
import Baconipsum from "./provider/Baconipsum.js";
import Dinoipsum from "./provider/Dinoipsum.js";
import LoremService from "./LoremService.js";

function getCurrentText() {
    if (currentText) {
        return Promise.resolve(currentText);
    } else {
        return getNextText();
    }
}

function getNextText() {
    return LoremService.load(currentProvider)
        .then(response => response.text())
        .then(text => {
            currentText = text;
            return currentText;
        });
}

function getCurrentProvider() {
    return currentProvider;
}

function getProvider(providerId) {
    return providers.find(p => p.id === providerId);
}

function sendCurrentText() {
    getCurrentText().then((text) => {
        // return browser.runtime.sendMessage({
        return chrome.runtime.sendMessage({
            message: "loremTextResponse",
            text: text,
        });
    });
}

function sendNextText() {
    getNextText().then((text) => {
        // return browser.runtime.sendMessage({
        return chrome.runtime.sendMessage({
            message: "loremTextResponse",
            text: text,
        });
    });
}

const providers = [
    new Loripsum(),
    new Baconipsum(),
    new Dinoipsum(),
];

let currentProvider = providers[0];

let currentText = "";

// SettingsStorage.loadCurrentProvider().then((cpid) => {
SettingsStorage.loadCurrentProvider((cpid) => {
    if (cpid) {
        currentProvider = getProvider(cpid);
    }
});

// browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.hasOwnProperty("message")) {
        switch (request.message) {
            case "providers":
                sendResponse({
                    providers: providers,
                    currentProviderId: currentProvider.id,
                });
                break;
            case "providerChange":
                currentProvider = getProvider(request.newProviderId);
                ContextMenu.refreshContextMenu(currentProvider.name);
                SettingsStorage.storeCurrentProvider(request.newProviderId);
                sendNextText();
                break;
            case "providerOptionChange":
                const provider = getProvider(request.option.provider);
                provider.setOption(request.option.key, request.option.value);
                sendNextText();
                break;
            case "currentLoremText":
                sendCurrentText();
                break;
            case "nextLoremText":
                sendNextText();
                break;
            case "currentProviderName":
                sendResponse({
                    currentProviderName: currentProvider.name,
                });
                break;
            default:
                break;
        }
    }
});

ContextMenu.setupContextMenu();

export default {
    getCurrentProvider: getCurrentProvider,
    getCurrentText: getCurrentText,
    getNextText: getNextText,
};
