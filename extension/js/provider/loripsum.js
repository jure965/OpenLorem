import BaseProvider from "./base.provider";

export const length = {
    SHORT: "short",
    MEDIUM: "medium",
    LONG: "long",
    VERYLONG: "verylong",
};

export class Loripsum extends BaseProvider {
    constructor() {
        super(
            "loripsum",
            "Loripsum",
            "http://loripsum.net/api/",
            {
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
            }
        );
    }

    generateURL() {
        let url = this.baseURL;
        for (let key in this.options) {
            url += this.options[key] ? "/" + key : "";
        }
        return url;
    }
}

export default Loripsum;
