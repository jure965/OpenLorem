browser.storage.local.get("contextMenu").then((item) => {
    document.querySelector("#context-menu").checked = item ? item.contextMenu : false;
});

document.querySelector("form").addEventListener("change", (e) => {
    e.preventDefault();
    return browser.storage.local.set({
        contextMenu: document.querySelector("#context-menu").checked,
    });
});
