function setText(text) {
  document.getElementById("output").innerHTML = text;
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
  var url = "https://baconipsum.com/api/?type=" + type + "&" + dtype + "=" + number + "&start-with-lorem=" + start_with_lorem + "&format=" + format;
  httpGetAsync(url, setText);
}

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
	
	
  }
});