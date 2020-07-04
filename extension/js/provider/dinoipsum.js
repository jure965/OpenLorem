import BaseProvider from "./base.provider";

export const format = {
    JSON: "json",
    TEXT: "text",
    HTML: "html",
};

class Dinoipsum extends BaseProvider {
    constructor() {
        super(
            "dinoipsum",
            "Dinoipsum",
            "http://dinoipsum.herokuapp.com/api/",
            {
                format: format.HTML,
                words: 30,
                paragraphs: 5,
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

export default Dinoipsum;
