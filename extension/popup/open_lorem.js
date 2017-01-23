function setText(text) {
	document.getElementById("output").innerHTML = text;
	browser.storage.local.set({
		loremtext: text
	});
}

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

function httpGetAsync(theUrl, callback)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", theUrl, true);
	xmlHttp.send(null);
}

function callBaconIpsum(type, dtype, number, start_with_lorem, format) {
//	document.getElementById("output").innerHTML = url;
	var url = "https://baconipsum.com/api/?type=" + type + "&" + dtype + "=" + number + "&start-with-lorem=" + start_with_lorem + "&format=" + format;
	httpGetAsync(url, setText);
}

function callLoripsum(url) {
//	document.getElementById("output").innerHTML = url;
	httpGetAsync(url, setText);
}

document.addEventListener("change", function() {
	var provider = document.getElementById("provider").options[document.getElementById("provider").selectedIndex].value;
	changeProvider(provider);
});

document.addEventListener("click", (e) => {
	if (e.target.classList.contains("get")) {
		var provider = document.getElementById("provider").options[document.getElementById("provider").selectedIndex].value;
		if (provider == "baconipsum") {
			var type = document.querySelectorAll(".baconipsum .type")[0].options[document.querySelectorAll(".baconipsum .type")[0].selectedIndex].value;
			var dtype = document.querySelectorAll(".baconipsum .dtype")[0].options[document.querySelectorAll(".baconipsum .dtype")[0].selectedIndex].value;
			var number = parseInt(document.querySelectorAll(".baconipsum .number")[0].value);
			var start_with_lorem = document.querySelectorAll(".baconipsum .start-with-lorem")[0].checked ? "1" : "0";
			var format = document.querySelectorAll(".baconipsum .format")[0].options[document.querySelectorAll(".baconipsum .format")[0].selectedIndex].value;
			callBaconIpsum(type, dtype, number, start_with_lorem, format);
			browser.storage.local.set({
				baconipsum: {
					type: type,
					dtype: dtype,
					number: number,
					start_with_lorem: start_with_lorem,
					format: format
				}
			});
		}
		if (provider == "loripsum") {
			var url = "http://loripsum.net/api";
			var number = parseInt(document.querySelectorAll(".loripsum .number")[0].value);
			var length = document.querySelectorAll(".loripsum .length")[0].options[document.querySelectorAll(".loripsum .length")[0].selectedIndex].value;
			var decorate = document.querySelectorAll(".loripsum .decorate")[0].checked;
			var link = document.querySelectorAll(".loripsum .link")[0].checked
			var ul = document.querySelectorAll(".loripsum .ul")[0].checked
			var ol = document.querySelectorAll(".loripsum .ol")[0].checked
			var dl = document.querySelectorAll(".loripsum .dl")[0].checked
			var bq = document.querySelectorAll(".loripsum .bq")[0].checked
			var code = document.querySelectorAll(".loripsum .code")[0].checked
			var headers = document.querySelectorAll(".loripsum .headers")[0].checked
			var allcaps = document.querySelectorAll(".loripsum .allcaps")[0].checked
			var prude = document.querySelectorAll(".loripsum .prude")[0].checked
			var plaintext = document.querySelectorAll(".loripsum .plaintext")[0].checked
			url += "/" + number;
			url += "/" + length;
			url += decorate ? "/decorate" : "";
			url += link ? "/link" : "";
			url += ul ? "/ul" : "";
			url += ol ? "/ol" : "";
			url += dl ? "/dl" : "";
			url += bq ? "/bq" : "";
			url += code ? "/code" : "";
			url += headers ? "/headers" : "";
			url += allcaps ? "/allcaps" : "";
			url += prude ? "/prude" : "";
			url += plaintext ? "/plaintext" : "";
			callLoripsum(url);
			browser.storage.local.set({
				loripsum: {
					number: number,
					length: length,
					decorate: decorate,
					link: link,
					ul: ul,
					ol: ol,
					dl: dl,
					bq: bq,
					code: code,
					headers: headers,
					allcaps: allcaps,
					prude: prude,
					plaintext: plaintext
				}
			});
		}
	}
});

window.onload = function() {
	browser.storage.local.get('provider').then((res) => {
		if (res.provider) changeProvider(res.provider);
	});
	browser.storage.local.get('loremtext').then((res) => {
		if (res.loremtext) setText(res.loremtext);
	});
	browser.storage.local.get('loripsum').then((res) => {
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
