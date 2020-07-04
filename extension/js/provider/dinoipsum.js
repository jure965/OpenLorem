import BaseProvider from "./baseProvider";

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
        return this.baseURL + "?" + this.options.entries
            .map((key, value) => {
                return value ? key + "=" + value : 0;
            })
            .filter(Boolean)
            .join("&");
    }
}
