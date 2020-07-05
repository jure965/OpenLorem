import BaseProvider from "./BaseProvider.js";

export const format = {
    JSON: "json",
    TEXT: "text",
    HTML: "html",
};

export const defaultOptions = {
    format: format.HTML,
    words: 30,
    paragraphs: 5,
};

export default class Dinoipsum extends BaseProvider {
    constructor() {
        super(
            "dinoipsum",
            "Dinoipsum",
            "http://dinoipsum.herokuapp.com/api/",
            defaultOptions
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
