var settings =  (function(){

	var readProvider = function(provider_id) {
		let tmp = localStorage.getItem(provider_id);
        return JSON.parse(tmp);
	};

    var loadProvider = function(provider_id) {
        let providerSettings = readProvider(provider_id);
		for (let key in providerSettings) {
			settingsToHtml(provider_id, key, providerSettings[key]);
		}
    }

	var settingsToHtml = function(provider_id, key, value) {
		let providerElement = document.getElementById(provider_id);
		let element = document.querySelector("[name=" + key + "]");

		if (!element)
			return;

		if (utils.isCheckBox(element)) {
			element.checked = value;
		} else {
			element.value = value;
		}
	}

    var saveElements = function(provider, elements) {
		var data = {};
		for (var element of elements) {
			if (utils.isCheckBox(element))
				data[element.name] = element.checked;
			else
				data[element.name] = element.value;
		}
		localStorage.setItem(provider, JSON.stringify(data));
    }

    return {

        loadAll: function() {
			/* Loading current provider and all providers settings from localStorage */

            let provider = localStorage.getItem("provider");
			if (!provider)
				provider = currentProvider;
			changeProvider(provider);
            for(let p in providers) {
                loadProvider(providers[p].config().id);
            }
        },
		getProvider: function(provider_id) {
			return readProvider(provider_id);
		},
        saveProvider: function(provider) {
			var providerElement = document.getElementById(provider);
			var elements = providerElement.querySelectorAll("input,select");
			saveElements(provider, elements);
        },
        saveCurrentProvider: function() {
            localStorage.setItem("provider", currentProvider);
        }
    };
})();

