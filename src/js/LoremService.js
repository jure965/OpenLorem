export default class LoremService {
    static httpGetAsync(theUrl, callback) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                callback(xmlHttp.responseText);
            // Missing error handling
        };
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    }

    static load(provider) {
        if (provider) {
            return fetch(provider.generateURL());
        }
        console.log("Provider is undefined");
    }
}
