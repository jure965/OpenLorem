function changeProvider(provider) {
	var providers = document.querySelectorAll(".provider");
	for (i = 0; i < providers.length; i++) {
		providers[i].style.display = "none";
	}
	document.querySelectorAll("." + provider)[0].style.display = "block";
	localStorage.setItem("provider", provider);
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
		var loripsum = {
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
		};
		localStorage.setItem(provider, JSON.stringify(loripsum));
	}
	else if (provider == "baconipsum") {
		var baconipsum = {
			type: document.querySelectorAll(".baconipsum .type")[0].options[document.querySelectorAll(".baconipsum .type")[0].selectedIndex].value,
			dtype: document.querySelectorAll(".baconipsum .dtype")[0].options[document.querySelectorAll(".baconipsum .dtype")[0].selectedIndex].value,
			number: parseInt(document.querySelectorAll(".baconipsum .number")[0].value),
			start_with_lorem: document.querySelectorAll(".baconipsum .start-with-lorem")[0].checked,
			format: document.querySelectorAll(".baconipsum .format")[0].options[document.querySelectorAll(".baconipsum .format")[0].selectedIndex].value
		};
		localStorage.setItem(provider, JSON.stringify(baconipsum));
	}
}

function setText(text) {
	document.getElementById("output").innerHTML = text;
	localStorage.setItem("loremtext", text);
}

function getText(provider) {
	saveSettings(provider);
	if (provider == "baconipsum") {
		var res = JSON.parse(localStorage.getItem(provider));
		var url = "https://baconipsum.com/api/?";
		url += "type=" + res.type + "&";
		url += res.dtype + "=" + res.number + "&";
		url += "start-with-lorem=" + res.start_with_lorem + "&";
		url += "format=" + res.format;
		httpGetAsync(url, setText);
		
	}
	else if (provider == "loripsum") {
		var res = JSON.parse(localStorage.getItem(provider));
		var url = "http://loripsum.net/api";
		url += "/" + res.number;
		url += "/" + res.length;
		url += res.decorate ? "/decorate" : "";
		url += res.link ? "/link" : "";
		url += res.ul ? "/ul" : "";
		url += res.ol ? "/ol" : "";
		url += res.dl ? "/dl" : "";
		url += res.bq ? "/bq" : "";
		url += res.code ? "/code" : "";
		url += res.headers ? "/headers" : "";
		url += res.allcaps ? "/allcaps" : "";
		url += res.prude ? "/prude" : "";
		url += res.plaintext ? "/plaintext" : "";
		httpGetAsync(url, setText);
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
	var provider = localStorage.getItem("provider");
	if (provider) changeProvider(provider);
	var loremtext = localStorage.getItem("loremtext");
	if (loremtext) setText(loremtext);
	var loripsum = localStorage.getItem("loripsum");
	if (loripsum) {
		loripsum = JSON.parse(loripsum);
		//textbox number
		document.querySelectorAll(".loripsum .number")[0].value = loripsum.number;
		//select length
		var sel = document.querySelectorAll(".loripsum .length")[0];
		var opts = sel.options;
		for (var opt, j = 0; opt = opts[j]; j++) {
			if (opt.value == loripsum.length) {
				sel.selectedIndex = j;
				break;
			}
		}
		//checkboxes
		document.querySelectorAll(".loripsum .decorate")[0].checked = loripsum.decorate;
		document.querySelectorAll(".loripsum .link")[0].checked = loripsum.link;
		document.querySelectorAll(".loripsum .ul")[0].checked = loripsum.ul;
		document.querySelectorAll(".loripsum .ol")[0].checked = loripsum.ol;
		document.querySelectorAll(".loripsum .dl")[0].checked = loripsum.dl;
		document.querySelectorAll(".loripsum .bq")[0].checked = loripsum.bq;
		document.querySelectorAll(".loripsum .code")[0].checked = loripsum.code;
		document.querySelectorAll(".loripsum .headers")[0].checked = loripsum.headers;
		document.querySelectorAll(".loripsum .allcaps")[0].checked = loripsum.allcaps;
		document.querySelectorAll(".loripsum .prude")[0].checked = loripsum.prude;
		document.querySelectorAll(".loripsum .plaintext")[0].checked = loripsum.plaintext;
	}
	var baconipsum = localStorage.getItem("baconipsum");
	if (baconipsum) {
		baconipsum = JSON.parse(baconipsum);
		//select type
		var sel = document.querySelectorAll(".baconipsum .type")[0];
		var opts = sel.options;
		for (var opt, j = 0; opt = opts[j]; j++) {
			if (opt.value == baconipsum.type) {
				sel.selectedIndex = j;
				break;
			}
		}
		//textbox number
		document.querySelectorAll(".baconipsum .number")[0].value = baconipsum.number;
		//select dtype
		sel = document.querySelectorAll(".baconipsum .dtype")[0];
		opts = sel.options;
		for (var opt, j = 0; opt = opts[j]; j++) {
			if (opt.value == baconipsum.dtype) {
				sel.selectedIndex = j;
				break;
			}
		}
		//checkboxes
		document.querySelectorAll(".baconipsum .start-with-lorem")[0].checked = baconipsum.start_with_lorem;
		//select format
		sel = document.querySelectorAll(".baconipsum .format")[0];
		opts = sel.options;
		for (var opt, j = 0; opt = opts[j]; j++) {
			if (opt.value == baconipsum.format) {
				sel.selectedIndex = j;
				break;
			}
		}
	}
}
