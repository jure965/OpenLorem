import background from "./background.js";

export default class BackgroundUtils {
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
                        id: "insertLoremText",
                        title: ["Insert", providerName].join(" "),
                        contexts: ["all"]
                    });
                }
            });
        });
    }

    /**
     * Adds click event listener, where we perform the appropriate action given the
     * ID of the menu item that was clicked.
     */
    static setupContextMenu() {
        browser.menus.onClicked.addListener((request, tab) => {
            switch (request.menuItemId) {
                case "insertLoremText":
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
