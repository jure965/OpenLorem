export default class SettingsStorage {
    static storeCurrentProvider(currentProviderId) {
        // return browser.storage.local.set({
        return chrome.storage.local.set({
            currentProviderId: currentProviderId,
        });
    }

    // static loadCurrentProvider() {
    static loadCurrentProvider(callback) {
        // return browser.storage.local.get("currentProviderId").then((item) => {
        return chrome.storage.local.get("currentProviderId", (item) => {
            if (item && item.hasOwnProperty("currentProviderId")) {
                // return item.currentProviderId;
                callback(item.currentProviderId);
            }
            return null;
        });
    }

    static storeProviderOptions(provider) {
        // return browser.storage.local.get("providerSettings").then((item) => {
        return chrome.storage.local.get("providerSettings", (item) => {
            let providerSettings = {};
            if (item && item.hasOwnProperty("providerSettings")) {
                providerSettings = item.providerSettings;
            }
            providerSettings[provider.id] = provider.options;
            // return browser.storage.local.set({providerSettings});
            return chrome.storage.local.set({providerSettings});
        });
    }

    // static loadProviderOptions(provider) {
    static loadProviderOptions(provider, callback) {
        // return browser.storage.local.get("providerSettings").then((item) => {
        return chrome.storage.local.get("providerSettings", (item) => {
            if (item && item.hasOwnProperty("providerSettings")) {
                const providerSettings = item.providerSettings;
                if (providerSettings.hasOwnProperty(provider.id)) {
                    // return providerSettings[provider.id];
                    callback(providerSettings[provider.id]);
                }
            }
            return null;
        });
    }
}
