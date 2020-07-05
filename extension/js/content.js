let clickedElement = null;

function setClickedElement(event) {
    //right click
    if (event.button === 2) {
        clickedElement = event.target;
    }
}

document.addEventListener("mousedown", setClickedElement, true);

// support for iframe elements
window.addEventListener("load", () => {
    let elementList = document.querySelectorAll("iframe");
    elementList.forEach((element) => {
        element.contentWindow.document.addEventListener("mousedown", setClickedElement, true);
    });
});

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "fillWithLoremText") {
        if (clickedElement != null) {
            clickedElement.innerHTML = request.text;
            sendResponse({
                message: "OK",
            });
        } else {
            sendResponse({
                message: "FAIL",
            });
        }
    }
});
