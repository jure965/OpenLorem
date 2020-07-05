import BaseProvider from "./BaseProvider.js";

export const type = {
    ALL_MEAT: "all-meat",
    MEAT_AND_FILLER: "meat-and-filler",
};

export const format = {
    JSON: "json",
    TEXT: "text",
    HTML: "html",
};

export const defaultOptions = {
    type: type.ALL_MEAT,
    paras: 5,
    sentences: 0,
    startWithLorem: 0,
    format: format.HTML,
};

export default class Baconipsum extends BaseProvider {
    constructor() {
        super(
            "baconipsum",
            "Baconipsum",
            "https://baconipsum.com/api/",
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
