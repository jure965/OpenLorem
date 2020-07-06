export default class SettingsStorage {
    static storeCurrentProvider(currentProviderId) {
        return browser.storage.local.set({
            currentProviderId: currentProviderId,
        });
    }

    static loadCurrentProvider() {
        return browser.storage.local.get("currentProviderId").then((item) => {
            if (item && item.hasOwnProperty("currentProviderId")) {
                return item.currentProviderId;
            }
            return null;
        });
    }

    static storeProviderOptions(provider) {
        return browser.storage.local.get("providerSettings").then((item) => {
            let providerSettings = {};
            if (item && item.hasOwnProperty("providerSettings")) {
                providerSettings = item.providerSettings;
            }
            providerSettings[provider.id] = provider.options;
            return browser.storage.local.set({providerSettings});
        });
    }

    static loadProviderOptions(provider) {
        return browser.storage.local.get("providerSettings").then((item) => {
            if (item && item.hasOwnProperty("providerSettings")) {
                const providerSettings = item.providerSettings;
                if (providerSettings.hasOwnProperty(provider.id)) {
                    return providerSettings[provider.id];
                }
            }
            return null;
        });
    }
}
