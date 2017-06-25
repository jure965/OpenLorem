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

	// Load previously displayed text
	loadOldText();

};

function loadOldText() {
	var text = localStorage.getItem("lastText");
	if (!text)
		return;

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
