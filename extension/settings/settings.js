function saveOptions(e) {
    e.preventDefault();
    return browser.storage.local.set({
        context_menu: document.querySelector("#context-menu").checked,
    });
}

function restoreOptions() {
    return browser.storage.local.get("context_menu").then((result) => {
        document.querySelector("#context-menu").checked = result.context_menu || false;
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
