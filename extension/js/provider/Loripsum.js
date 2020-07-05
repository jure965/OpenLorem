import BaseProvider from "./BaseProvider.js";

export const length = {
    SHORT: "short",
    MEDIUM: "medium",
    LONG: "long",
    VERYLONG: "verylong",
};

export const defaultOptions = {
    paragraphs: 5,
    length: length.SHORT,
    link: false,
    ul: false,
    ol: false,
    dl: false,
    bq: false,
    code: false,
    headers: false,
    allcaps: false,
    prude: false,
    plaintext: false,
};

export default class Loripsum extends BaseProvider {
    constructor() {
        super(
            "loripsum",
            "Loripsum",
            "http://loripsum.net/api/",
            defaultOptions
        );
    }

    generateURL() {
        return this.baseURL + Object.entries(this.options)
            .map(entry => {
                if (["paragraphs", "length"].includes(entry[0])) return entry[1];
                return entry[1] ? entry[0] : 0;
            })
            .filter(Boolean)
            .join("/");
    }
}
