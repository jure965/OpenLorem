import Loripsum from "./provider/loripsum.js";
import SettingsStorage from "./settingsStorage.js";
import Utils from "./utils.js";
import Baconipsum from "./provider/baconipsum.js";
import Dinoipsum from "./provider/dinoipsum.js";
import LoremService from "./loremService.js";

const settings = SettingsStorage.getDefaultSettings();

SettingsStorage.loadSettings().then((s) => {
    Object.assign(settings, s);
});

Utils.setupContextMenu();

const providers = [
    new Loripsum(),
    new Baconipsum(),
    new Dinoipsum(),
];

let currentProvider = providers.find(p => p.id === settings.currentProviderId);

let currentText = "";

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
        case "providers":
            sendResponse({
                message: "OK",
                providers: providers,
                currentProviderId: currentProvider.id,
            });
            break;
        case "providerChange":
            currentProvider = providers.find(p => p.id === request.newProviderId);
            sendResponse({
                message: "OK",
            });
            break;
        case "currentLoremText":
            if (currentText) {
                sendResponse({
                    message: "OK",
                    text: currentText,
                });
                break;
            }
        /* falls through */
        case "nextLoremText":
            LoremService.load(currentProvider)
                .then(response => response.text())
                .then(text => {
                    sendResponse({
                        message: "OK",
                        text: text,
                    });
                });
            break;
        case "currentProviderName":
            sendResponse({
                message: "OK",
                currentProviderName: currentProvider.name,
            });
            break;
        default:
            break;

    }
});
