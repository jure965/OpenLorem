let clickedElement = null;

function setClickedElement(event) {
    //right click
    if (event.button === 2) {
        clickedElement = event.target;
    }
}

document.addEventListener("mousedown", setClickedElement, true);

// support for iframe elements
// nested iframe elements are not yet supported
window.addEventListener("load", () => {
    let elementList = document.querySelectorAll("iframe");
    elementList.forEach((element) => {
        element.contentWindow.document.addEventListener("mousedown", setClickedElement, true);
    });
});

function isTextbox(element) {
    return (element || {}).nodeName.toLowerCase() === "input" && (element || {}).type.toLowerCase() === "text";
}

// browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.message) {
        case "fillWithLoremText":
            if (clickedElement != null && document.hasFocus()) {
                if (isTextbox(clickedElement)) {
                    clickedElement.value = request.text;
                } else {
                    clickedElement.innerHTML = request.text;
                }
            }
            break;
        default:
            break;
    }
});
