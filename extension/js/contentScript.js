let clickedElement = null;

function setClickedElement(event) {
    //right click
    if (event.button == 2) {
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "get_clicked_element") {
        console.log(clickedElement);

        sendResponse({value: clickedElement.value});
        chrome.runtime.sendMessage({
            message: "give_lorem",
        });
    } else if (request.message === "this_is_lorem") {
        if (request.data) {
            clickedElement.innerHTML = request.data;
        }
    }
});
