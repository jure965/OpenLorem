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
Create context menu.
*/

browser.contextMenus.create({
    id: "insert-ipsum",
    title: "Insert Lorem Ipsum",
    contexts: ["all"]
}, onCreated);


/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {

        case "insert-ipsum":
            chrome.tabs.sendMessage(tab.id, "getClickedEl");
        break;
    }
});
