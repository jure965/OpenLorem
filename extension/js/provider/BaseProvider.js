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

    /**
     * Set option value.
     *
     * @param key option key
     * @param value option value
     */
    setOption(key, value) {
        this.options[key] = value;
    }

    /**
     * @abstract
     * Generate url for API call.
     */
    generateURL() {
        throw new TypeError("Do not call abstract method from child.");
    }
}

export default BaseProvider;
