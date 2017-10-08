function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        context_menu: document.querySelector("#context-menu").checked
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#context-menu").checked = result.context_menu || false;
    }

    function onError(error) {
    console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("context_menu");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
