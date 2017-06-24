var example = (function(){

    var generateUrl = function() {
        let url = baconipsum.config().api;
        let options = settings.getProvider(baconipsum.config().id);
        // Add url generating
        return url;
    };

    return {

        config: function() {
            return {
                id: 'example',
                name: 'Example',
                api: 'http://example.com/api/'
            };
        },
        createUrl: function() {
            return generateUrl();
        }

    };
})();
