import background from "./background.js";

export default class Utils {
    static isCheckBox(element) {
        return element.type.toLowerCase() === "checkbox";
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

        /**
         * Remove and create context menu.
         */
        function refreshMenu(providerName) {
            browser.menus.removeAll().then(() => {
                if (providerName) {
                    browser.menus.create({
                        id: "insert-ipsum",
                        title: ["Insert", providerName].join(" "),
                        contexts: ["all"]
                    }, () => {
                        if (browser.runtime.lastError) {
                            console.log(`Error: ${browser.runtime.lastError}`);
                        }
                    });
                }
            });
        }

        browser.storage.local.get("context_menu").then((item) => {
            if (item.context_menu) {
                refreshMenu(background.getCurrentProvider().name);
            } else {
                refreshMenu("");
            }
        }, (error) => {
            console.log(`Error: ${error}`);
        });

        browser.storage.onChanged.addListener(e => refreshMenu(e.context_menu.newValue));
    }
}