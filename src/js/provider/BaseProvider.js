import SettingsStorage from "../SettingsStorage.js";

export default class BaseProvider {

    /**
     * @constructor
     * @param id
     * @param name
     * @param baseURL
     * @param options
     */
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
        // SettingsStorage.loadProviderOptions(this).then((options) => {
        SettingsStorage.loadProviderOptions(this, (options) => {
            if (options) {
                this.options = options;
            }
        });
    }

    /**
     * Sets option for provider.
     *
     * @param key
     * @param value
     */
    setOption(key, value) {
        this.options[key] = value;
        SettingsStorage.storeProviderOptions(this);
    }

    /**
     * @abstract
     * Generate url for API call.
     */
    generateURL() {
        throw new TypeError("Do not call abstract method generateURL from child.");
    }
}
