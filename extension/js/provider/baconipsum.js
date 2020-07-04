import BaseProvider from "./base.provider";

export const type = {
    ALL_MEAT: "all-meat",
    MEAT_AND_FILLER: "meat-and-filler",
};

export const format = {
    JSON: "json",
    TEXT: "text",
    HTML: "html",
};

class Baconipsum extends BaseProvider {
    constructor() {
        super(
            "baconipsum",
            "Baconipsum",
            "https://baconipsum.com/api/",
            {
                type: type.ALL_MEAT,
                paras: 5,
                sentences: 0,
                startWithLorem: 0,
                format: format.HTML,
            }
        );
    }

    generateURL() {
        let url = this.baseURL + "?";
        for (let key in this.options) {
            if (this.options[key]) {
                url += "&" + key + "=" + this.options[key];
            }
        }
        return url;
    }
}

export default Baconipsum;
