export default class Utils {
    static isCheckBox(element) {
        return element.type.toLowerCase() === "checkbox";
    }

    static setupContextMenu() {
        /**
         * Called when the item has been created, or when creation failed due to an error.
         */
        function onCreated() {
            if (browser.runtime.lastError) {
                console.log(`Error: ${browser.runtime.lastError}`);
            }
        }

        /**
         * The click event listener, where we perform the appropriate action given the
         * ID of the menu item that was clicked.
         */
        browser.menus.onClicked.addListener((request, tab) => {
            switch (request.menuItemId) {
                case "insert-ipsum":
                    browser.tabs.sendMessage(tab.id, {
                        message: "get_clicked_element",
                    }).then();
                    break;
                default:
                    break;
            }
        });

        /**
         * Remove and create context menu.
         */
        function refreshMenu(show) {
            browser.menus.removeAll().then(() => {
                if (show) {
                    browser.menus.create({
                        id: "insert-ipsum",
                        title: "Insert Lorem Ipsum", // todo: provider name
                        contexts: ["all"]
                    }, onCreated);
                }
            });
        }

        function onGot(item) {
            refreshMenu(!!item.context_menu);
        }

        function onError(error) {
            console.log(`Error: ${error}`);
        }

        browser.storage.local.get("context_menu").then(onGot, onError);

        browser.storage.onChanged.addListener(e => refreshMenu(e.context_menu.newValue));
    }
}
