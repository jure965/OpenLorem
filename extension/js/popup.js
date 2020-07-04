let currentProvider = "loripsum";

let providers = [
	loripsum,
	baconipsum,
	dinoipsum,
	//example
];

window.onload = function() {

	settings.loadAll();

	populateProviders();

	// Load previously displayed text
	loadOldText();

	// Provider <select> change listener
	document.getElementById("provider").onchange = function() {
		settings.saveProvider(currentProvider);
		changeProvider(this.value);
		loader.load();
	};

	// Display <button> click listener
	document.getElementById("display").onclick = function() {
		settings.saveProvider(currentProvider);
		loader.load();
	};

	/* overlay hiding */
	for (let overlay of document.getElementsByClassName("overlay")) {
		overlay.onclick = function(e) {
			if(e.target == this) {
				this.classList.add("hidden");
			}
		};
	}

	for (let close of document.getElementsByClassName("close")) {
		close.onclick = function() {
			this.parentElement.parentElement.classList.add("hidden");
		};
	}

	document.getElementById("info-button").onclick = function() {
		document.getElementById(this.dataset.target).classList.remove("hidden");
	};
};

function loadOldText() {
	var text = localStorage.getItem("lastText");
	if (!text)
		settings.saveProvider(currentProvider);
		loader.load();

	loader.fillOutput(text);
}

function changeProvider(new_provider) {
	document.getElementById(currentProvider).style.display = "none";
	document.getElementById(new_provider).style.display = "block";
	currentProvider = new_provider;
	settings.saveCurrentProvider();
}

function populateProviders() {
	let providerSelect = document.getElementById("provider");
	providers.forEach(function(provider) {
		var option = document.createElement("option");
		option.textContent = provider.config().name;
		option.value = provider.config().id;
		option.selected = provider.config().id == currentProvider;
		providerSelect.appendChild(option);
	});
}
