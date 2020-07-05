import background from "./background.js";

export default class Utils {
    static isCheckBox(element) {
        return element.type.toLowerCase() === "checkbox";
    }

    /**
     * Remove and create context menu.
     */
    static refreshContextMenu() {
        browser.storage.local.get("context_menu").then((item) => {
            let providerName = null;
            if (item.context_menu) {
                providerName = background.getCurrentProvider().name;
            }
            browser.menus.removeAll().then(() => {
                if (providerName) {
                    browser.menus.create({
                        id: "insert-ipsum",
                        title: ["Insert", providerName].join(" "),
                        contexts: ["all"]
                    });
                }
            });
        });
    }

    static setupContextMenu() {
        /**
         * The click event listener, where we perform the appropriate action given the
         * ID of the menu item that was clicked.
         */
        browser.menus.onClicked.addListener((request, tab) => {
            switch (request.menuItemId) {
                case "insert-ipsum":
                    background.getCurrentText().then((currentText) => {
                        browser.tabs.sendMessage(tab.id, {
                            message: "fillWithLoremText",
                            text: currentText,
                        });
                    });
                    break;
                default:
                    break;
            }
        });

        this.refreshContextMenu();
    }
}
