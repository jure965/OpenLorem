import Loripsum from "./provider/Loripsum.js";
import SettingsStorage from "./SettingsStorage.js";
import BackgroundUtils from "./BackgroundUtils.js";
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
        browser.runtime.sendMessage({
            message: "loremTextResponse",
            text: text,
        });
    });
}

function sendNextText() {
    getNextText().then((text) => {
        browser.runtime.sendMessage({
            message: "loremTextResponse",
            text: text
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

SettingsStorage.loadCurrentProvider().then((cpid) => {
    if (cpid) {
        currentProvider = getProvider(cpid);
    }
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
        case "providers":
            sendResponse({
                providers: providers,
                currentProviderId: currentProvider.id,
            });
            break;
        case "providerChange":
            currentProvider = getProvider(request.newProviderId);
            BackgroundUtils.refreshContextMenu(currentProvider.name);
            SettingsStorage.storeCurrentProvider(request.newProviderId);
            sendNextText();
            break;
        case "providerOptionChange":
            const provider = getProvider(request.option.provider);
            provider.setOption(request.option.key, request.option.value);
            SettingsStorage.storeProviderOptions(provider);
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
});

BackgroundUtils.setupContextMenu();

export default {
    getCurrentProvider: getCurrentProvider,
    getCurrentText: getCurrentText,
};
