import BaseProvider from "./BaseProvider.js";

const length = {
    SHORT: "short",
    MEDIUM: "medium",
    LONG: "long",
    VERYLONG: "verylong",
};

function getDefaultOptions() {
    return {
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
}

export default class Loripsum extends BaseProvider {
    constructor() {
        super(
            "loripsum",
            "Loripsum",
            "https://loripsum.net/api/",
            getDefaultOptions()
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
