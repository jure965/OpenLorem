import Loripsum from "./provider/loripsum";
import Baconipsum from "./provider/baconipsum";
import Dinoipsum from "./provider/dinoipsum";
import SettingsStorage from "./settingsStorage";
import Utils from "./utils";
import LoremService from "./loremService";

const settings = SettingsStorage.getDefaultSettings();

SettingsStorage.loadSettings().then((s) => {
    Object.assign(settings, s);
});

Utils.setContextMenu();

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
            LoremService.load(currentProvider, (text) => {
                currentText = text;
                sendResponse({
                    message: "OK",
                    text: currentText,
                });
            });
            break;
        default:
            break;

    }
});
