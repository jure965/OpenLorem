import Loripsum from "./provider/Loripsum.js";
import SettingsStorage from "./SettingsStorage.js";
import BackgroundUtils from "./BackgroundUtils.js";
import Baconipsum from "./provider/Baconipsum.js";
import Dinoipsum from "./provider/Dinoipsum.js";
import LoremService from "./LoremService.js";

const settings = SettingsStorage.getDefaultSettings();

SettingsStorage.loadSettings().then((s) => {
    Object.assign(settings, s);
});

const providers = [
    new Loripsum(),
    new Baconipsum(),
    new Dinoipsum(),
];

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

let currentProvider = getProvider(settings.currentProviderId);

let currentText = "";

export default {
    getProvider: getProvider,
    getCurrentProvider: getCurrentProvider,
    getCurrentText: getCurrentText,
    getNextText: getNextText,
};

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
            settings.currentProviderId = currentProvider.id;
            SettingsStorage.storeSettings(settings);
            break;
        case "providerOptionChange":
            getProvider(request.option.provider)
                .setOption(request.option.key, request.option.value);
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
