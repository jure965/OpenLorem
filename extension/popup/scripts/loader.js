var loader = function() {

    var httpGetAsync = function(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
            // Missing error handling
        };
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    };


    return {
        load: function() {
            let provider = window[currentProvider];
            let url = provider.createUrl();
            let output = document.getElementById("output");
            httpGetAsync(url, loader.fillOutput);
        },
        fillOutput: function(text) {
            document.getElementById("output").innerHTML = text;
            localStorage.setItem("lastText", text);
        }
    };

}();
