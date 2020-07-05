import {defaultOptions as loripsumDefaults} from "./provider/loripsum.js";
import {defaultOptions as baconipsumDefaults} from "./provider/baconipsum.js";
import {defaultOptions as dinoipsumDefaults} from "./provider/dinoipsum.js";

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
