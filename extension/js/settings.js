const settings = (function () {
    const settingsToHtml = function (provider_id, key, value) {
        // let providerElement = document.getElementById(provider_id);
        let element = document.querySelector("[name=" + key + "]");

        if (!element) {
            return;
        }

        if (utils.isCheckBox(element)) {
            element.checked = value;
        } else {
            element.value = value;
        }
    };

    const readProvider = function (provider_id) {
        let tmp = localStorage.getItem(provider_id);
        return JSON.parse(tmp);
    };

    const loadProvider = function (provider_id) {
        let providerSettings = readProvider(provider_id);
        for (let key in providerSettings) {
            settingsToHtml(provider_id, key, providerSettings[key]);
        }
    };

    const saveElements = function (provider, elements) {
        const data = {};
        for (const element of elements) {
            if (utils.isCheckBox(element))
                data[element.name] = element.checked;
            else
                data[element.name] = element.value;
        }
        localStorage.setItem(provider, JSON.stringify(data));
    };

    const loadAll = function () {
        /* Loading current provider and all providers settings from localStorage */
        let provider = localStorage.getItem("provider");
        if (!provider)
            provider = currentProvider;
        changeProvider(provider);
        for (let p in providers) {
            loadProvider(providers[p].config().id);
        }
    };

    const getProvider = function (provider_id) {
        return readProvider(provider_id);
    };

    const saveProvider = function (provider) {
        const providerElement = document.getElementById(provider);
        const elements = providerElement.querySelectorAll("input,select");
        saveElements(provider, elements);
    };

    const saveCurrentProvider = function () {
        localStorage.setItem("provider", currentProvider);
    };

    return {
        loadAll: loadAll,
        getProvider: getProvider,
        saveProvider: saveProvider,
        saveCurrentProvider: saveCurrentProvider,
    };
})();

