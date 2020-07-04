/*
Called when the item has been created, or when creation failed due to an error.
*/
function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.contextMenus.onClicked.addListener((request, tab) => {
    switch (request.menuItemId) {

        case "insert-ipsum":
            chrome.tabs.sendMessage(tab.id, {
                message: "get_clicked_element",
            });
        break;
    }
});

/*
Create/remove context menu.
*/
let menuID;
function toggleContextMenu(show) {
    if (show) {
        menuID = browser.contextMenus.create({
            id: "insert-ipsum",
            title: "Insert Lorem Ipsum",
            contexts: ["all"]
        }, onCreated);
    } else {
        browser.contextMenus.remove(menuID);
    }
}

function onGot(item) {
    toggleContextMenu(item.context_menu === true);
    console.log("item", item);
}

function onError(error) {
    console.log(`Error: ${error}`);
}

var getting = browser.storage.local.get("context_menu");
getting.then(onGot, onError);

function logStorageChange(e) {
    toggleContextMenu(e.context_menu.newValue);
}

browser.storage.onChanged.addListener(logStorageChange);
