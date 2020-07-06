import BaseProvider from "./BaseProvider.js";

const type = {
    ALL_MEAT: "all-meat",
    MEAT_AND_FILLER: "meat-and-filler",
};

const format = {
    JSON: "json",
    TEXT: "text",
    HTML: "html",
};

function getDefaultOptions() {
    return {
        type: type.ALL_MEAT,
        paras: 5,
        sentences: 5,
        startWithLorem: false,
        format: format.HTML,
    };
}

export default class Baconipsum extends BaseProvider {
    constructor() {
        super(
            "baconipsum",
            "Baconipsum",
            "https://baconipsum.com/api/",
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
