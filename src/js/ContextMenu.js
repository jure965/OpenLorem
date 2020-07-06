import background from "./background.js";

export default class ContextMenu {
    /**
     * Remove and create context menu.
     */
    static refreshContextMenu() {
        browser.storage.local.get("contextMenu").then((item) => {
            let providerName = null;
            if (item.contextMenu) {
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
                        return browser.tabs.sendMessage(tab.id, {
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
        browser.storage.onChanged.addListener((changes, areaName) => {
            if (areaName === "local" && changes.hasOwnProperty("contextMenu")) {
                this.refreshContextMenu();
            }
        });
    }
}
