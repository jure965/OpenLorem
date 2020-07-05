import {defaultOptions as loripsumDefaults} from "./provider/Loripsum.js";
import {defaultOptions as baconipsumDefaults} from "./provider/Baconipsum.js";
import {defaultOptions as dinoipsumDefaults} from "./provider/Dinoipsum.js";

export default class SettingsStorage {
    static getDefaultSettings() {
        return {
            currentProviderId: "loripsum",
            providerSettings: {
                loripsum: Object.assign({}, loripsumDefaults),
                baconipsum: Object.assign({}, baconipsumDefaults),
                dinoipsum: Object.assign({}, dinoipsumDefaults),
            },
        };
    }

    static loadSettings() {
        return browser.storage.local.get("settings");
    }

    static storeSettings(settings) {
        browser.storage.local.set({settings}).then(() => {
            console.log("Settings stored.");
        });
    }
}
