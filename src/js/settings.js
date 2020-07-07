// browser.storage.local.get("contextMenu").then((item) => {
chrome.storage.local.get("contextMenu", (item) => {
    document.querySelector("#context-menu").checked = item ? item.contextMenu : false;
});

document.querySelector("form").addEventListener("change", (e) => {
    e.preventDefault();
    // return browser.storage.local.set({
    return chrome.storage.local.set({
        contextMenu: document.querySelector("#context-menu").checked,
    });
});
