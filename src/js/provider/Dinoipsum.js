import BaseProvider from "./BaseProvider.js";

const format = {
    JSON: "json",
    TEXT: "text",
    HTML: "html",
};

function getDefaultOptions() {
    return {
        format: format.HTML,
        words: 30,
        paragraphs: 5,
    };
}

export default class Dinoipsum extends BaseProvider {
    constructor() {
        super(
            "dinoipsum",
            "Dinoipsum",
            "http://dinoipsum.herokuapp.com/api/",
            getDefaultOptions()
        );
    }

    generateURL() {
        return this.baseURL + "?" + Object.entries(this.options)
            .map(entry => {
                return entry[1] ? entry[0] + "=" + entry[1] : 0;
            })
            .filter(Boolean)
            .join("&");
    }
}
