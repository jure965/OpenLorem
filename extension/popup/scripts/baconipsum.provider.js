var baconipsum = (function(){

    var generateUrl = function() {
        let url = baconipsum.config().api;
        let options = settings.getProvider(baconipsum.config().id);
        url += "?" + options["block-type"] + "=" + options["block-length"];
        for (let key in options) {
            if (key === "block-type" || key === "block-length")
                continue;
            url += options[key] ? "&" + key + "=" + options[key]: "";
        }
        return url;
    };

    return {

        config: function() {
            return {
                id: 'baconipsum',
                name: 'Bacon Ipsum',
                api: 'https://baconipsum.com/api/'
            };
        },
        createUrl: function() {
            return generateUrl();
        }

    };
})();
