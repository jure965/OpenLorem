var loripsum = (function(){

    var generateUrl = function() {
        let url = loripsum.config().api;
        let options = settings.getProvider(loripsum.config().id);
        url += "/" + options.paragraphs;
        url += "/" + options.length;
        for (let key in options) {
            if (key === "paragraphs" || key === "length")
                continue;
            url += options[key] ? "/" + key: "";
        }
        return url;
    };

    return {

        config: function() {
            return {
                id: 'loripsum',
                name: 'Loripsum.net',
                api: 'http://loripsum.net/api'
            };
        },
        createUrl: function() {
            return generateUrl();
        }

    };
})();
