function changeProvider(provider) {
	var providers = document.querySelectorAll(".provider");
	for (i = 0; i < providers.length; i++) {
		providers[i].style.display = "none";
	}
	document.querySelectorAll("." + provider)[0].style.display = "block";
	browser.storage.local.set({
		provider: provider
	});
	var sel = document.getElementById("provider");
	var opts = sel.options;
	for (var opt, j = 0; opt = opts[j]; j++) {
		if (opt.value == provider) {
			sel.selectedIndex = j;
			break;
		}
	}
}

function httpGetAsync(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", theUrl, true);
	xmlHttp.send(null);
}

function saveSettings(provider) {
	if (provider == "loripsum") {
		browser.storage.local.set({
			loripsum: {
				number: parseInt(document.querySelectorAll(".loripsum .number")[0].value),
				length: document.querySelectorAll(".loripsum .length")[0].options[document.querySelectorAll(".loripsum .length")[0].selectedIndex].value,
				decorate: document.querySelectorAll(".loripsum .decorate")[0].checked,
				link: document.querySelectorAll(".loripsum .link")[0].checked,
				ul: document.querySelectorAll(".loripsum .ul")[0].checked,
				ol: document.querySelectorAll(".loripsum .ol")[0].checked,
				dl: document.querySelectorAll(".loripsum .dl")[0].checked,
				bq: document.querySelectorAll(".loripsum .bq")[0].checked,
				code: document.querySelectorAll(".loripsum .code")[0].checked,
				headers: document.querySelectorAll(".loripsum .headers")[0].checked,
				allcaps: document.querySelectorAll(".loripsum .allcaps")[0].checked,
				prude: document.querySelectorAll(".loripsum .prude")[0].checked,
				plaintext: document.querySelectorAll(".loripsum .plaintext")[0].checked
			}
		});
	}
	else if (provider == "baconipsum") {
		browser.storage.local.set({
			baconipsum: {
				type: document.querySelectorAll(".baconipsum .type")[0].options[document.querySelectorAll(".baconipsum .type")[0].selectedIndex].value,
				dtype: document.querySelectorAll(".baconipsum .dtype")[0].options[document.querySelectorAll(".baconipsum .dtype")[0].selectedIndex].value,
				number: parseInt(document.querySelectorAll(".baconipsum .number")[0].value),
				start_with_lorem: document.querySelectorAll(".baconipsum .start-with-lorem")[0].checked,
				format: document.querySelectorAll(".baconipsum .format")[0].options[document.querySelectorAll(".baconipsum .format")[0].selectedIndex].value
			}
		});
	}
}

function setText(text) {
	document.getElementById("output").innerHTML = text;
	browser.storage.local.set({
		loremtext: text
	});
}

function getText(provider) {
	saveSettings(provider);
	if (provider == "baconipsum") {
		browser.storage.local.get("baconipsum").then((res) => {
			var url = "https://baconipsum.com/api/?";
			url += "type=" + res.baconipsum.type + "&";
			url += res.baconipsum.dtype + "=" + res.baconipsum.number + "&";
			url += "start-with-lorem=" + res.baconipsum.start_with_lorem + "&";
			url += "format=" + res.baconipsum.format;
			httpGetAsync(url, setText);
		});
	}
	else if (provider == "loripsum") {
		browser.storage.local.get("loripsum").then((res) => {
			var url = "http://loripsum.net/api";
			url += "/" + res.loripsum.number;
			url += "/" + res.loripsum.length;
			url += res.loripsum.decorate ? "/decorate" : "";
			url += res.loripsum.link ? "/link" : "";
			url += res.loripsum.ul ? "/ul" : "";
			url += res.loripsum.ol ? "/ol" : "";
			url += res.loripsum.dl ? "/dl" : "";
			url += res.loripsum.bq ? "/bq" : "";
			url += res.loripsum.code ? "/code" : "";
			url += res.loripsum.headers ? "/headers" : "";
			url += res.loripsum.allcaps ? "/allcaps" : "";
			url += res.loripsum.prude ? "/prude" : "";
			url += res.loripsum.plaintext ? "/plaintext" : "";
			httpGetAsync(url, setText);
		});
	}
}

document.addEventListener("change", function() {
	var provider = document.getElementById("provider").options[document.getElementById("provider").selectedIndex].value;
	changeProvider(provider);
	saveSettings(provider);
});

document.addEventListener("click", (e) => {
	if (e.target.classList.contains("get")) {
		var provider = document.getElementById("provider").options[document.getElementById("provider").selectedIndex].value;
		getText(provider);
	}
});

window.onload = function() {
	browser.storage.local.get("provider").then((res) => {
		if (res.provider) changeProvider(res.provider);
	});
	browser.storage.local.get("loremtext").then((res) => {
		if (res.loremtext) setText(res.loremtext);
	});
	browser.storage.local.get("loripsum").then((res) => {
		if (res.loripsum) {
			//textbox number
			document.querySelectorAll(".loripsum .number")[0].value = res.loripsum.number;
			//select length
			var sel = document.querySelectorAll(".loripsum .length")[0];
			var opts = sel.options;
			for (var opt, j = 0; opt = opts[j]; j++) {
				if (opt.value == res.loripsum.length) {
					sel.selectedIndex = j;
					break;
				}
			}
			//checkboxes
			document.querySelectorAll(".loripsum .decorate")[0].checked = res.loripsum.decorate;
			document.querySelectorAll(".loripsum .link")[0].checked = res.loripsum.link;
			document.querySelectorAll(".loripsum .ul")[0].checked = res.loripsum.ul;
			document.querySelectorAll(".loripsum .ol")[0].checked = res.loripsum.ol;
			document.querySelectorAll(".loripsum .dl")[0].checked = res.loripsum.dl;
			document.querySelectorAll(".loripsum .bq")[0].checked = res.loripsum.bq;
			document.querySelectorAll(".loripsum .code")[0].checked = res.loripsum.code;
			document.querySelectorAll(".loripsum .headers")[0].checked = res.loripsum.headers;
			document.querySelectorAll(".loripsum .allcaps")[0].checked = res.loripsum.allcaps;
			document.querySelectorAll(".loripsum .prude")[0].checked = res.loripsum.prude;
			document.querySelectorAll(".loripsum .plaintext")[0].checked = res.loripsum.plaintext;
		}
	});
	browser.storage.local.get('baconipsum').then((res) => {
		if (res.baconipsum) {
			//select type
			var sel = document.querySelectorAll(".baconipsum .type")[0];
			var opts = sel.options;
			for (var opt, j = 0; opt = opts[j]; j++) {
				if (opt.value == res.baconipsum.type) {
					sel.selectedIndex = j;
					break;
				}
			}
			//textbox number
			document.querySelectorAll(".baconipsum .number")[0].value = res.baconipsum.number;
			//select dtype
			sel = document.querySelectorAll(".baconipsum .dtype")[0];
			opts = sel.options;
			for (var opt, j = 0; opt = opts[j]; j++) {
				if (opt.value == res.baconipsum.dtype) {
					sel.selectedIndex = j;
					break;
				}
			}
			//checkboxes
			document.querySelectorAll(".baconipsum .start-with-lorem")[0].checked = res.baconipsum.start_with_lorem;
			//select format
			sel = document.querySelectorAll(".baconipsum .format")[0];
			opts = sel.options;
			for (var opt, j = 0; opt = opts[j]; j++) {
				if (opt.value == res.baconipsum.format) {
					sel.selectedIndex = j;
					break;
				}
			}
		}
	});
}
