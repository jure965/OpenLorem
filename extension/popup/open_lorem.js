function setText(text) {
	document.getElementById("output").innerHTML = text;
}

function changeProvider(provider) {
	var providers = document.querySelectorAll(".provider");
	for (i = 0; i < providers.length; i++) {
		providers[i].style.display = "none";
	}
	document.querySelectorAll("." + provider)[0].style.display = "block";
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
		}
		if (provider == "loripsum") {
			var url = "http://loripsum.net/api";
			url += "/" + parseInt(document.querySelectorAll(".loripsum .number")[0].value);
			url += "/" + document.querySelectorAll(".loripsum .length")[0].options[document.querySelectorAll(".loripsum .length")[0].selectedIndex].value;
			url += document.querySelectorAll(".loripsum .decorate")[0].checked ? "/decorate" : "";
			url += document.querySelectorAll(".loripsum .link")[0].checked ? "/link" : "";
			url += document.querySelectorAll(".loripsum .ul")[0].checked ? "/ul" : "";
			url += document.querySelectorAll(".loripsum .ol")[0].checked ? "/ol" : "";
			url += document.querySelectorAll(".loripsum .dl")[0].checked ? "/dl" : "";
			url += document.querySelectorAll(".loripsum .bq")[0].checked ? "/bq" : "";
			url += document.querySelectorAll(".loripsum .code")[0].checked ? "/code" : "";
			url += document.querySelectorAll(".loripsum .headers")[0].checked ? "/headers" : "";
			url += document.querySelectorAll(".loripsum .allcaps")[0].checked ? "/allcaps" : "";
			url += document.querySelectorAll(".loripsum .prude")[0].checked ? "/prude" : "";
			url += document.querySelectorAll(".loripsum .plaintext")[0].checked ? "/plaintext" : "";
			callLoripsum(url);
		}
	}
});
