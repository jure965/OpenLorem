var utils = (function(){
    return {
        isCheckBox: function(element) {
            return element.type.toLowerCase() === "checkbox";
        }
    };
})();