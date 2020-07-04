import BaseProvider from "./baseProvider";

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
        return this.baseURL + this.options.entries
            .map((key, value) => {
                if (["paragraphs", "length"].includes(key)) return value;
                return value ? key : 0;
            })
            .filter(Boolean)
            .join("/");
    }
}
