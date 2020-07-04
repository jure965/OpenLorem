/**
 * @abstract
 */
class BaseProvider {
    constructor(id, name, baseURL, options) {
        if (this.constructor === BaseProvider) {
            throw new TypeError("Can not construct abstract class.");
        }
        if (this.generateURL === BaseProvider.prototype.generateURL) {
            throw new TypeError("Please implement abstract method generateURL.");
        }
        this.id = id;
        this.name = name;
        this.baseURL = baseURL;
        this.options = options;
    }

    getConfig() {
        return {
            id: this.id,
            name: this.name,
            baseURL: this.baseURL,
            options: this.options,
        };
    }

    setOptions(options) {
        this.options = options;
    }

    setOption(key, option) {
        this.options.key = option;
    }

    /**
     * @abstract
     */
    generateURL() {
        throw new TypeError("Do not call abstract method from child.");
    }
}

export default BaseProvider;
