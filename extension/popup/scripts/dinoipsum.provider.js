var dinoipsum = (function(){

    var generateUrl = function() {

        let url = dinoipsum.config().api + "?";
        let options = settings.getProvider(dinoipsum.config().id);
        for (let key in options) {
            url += "&" + key + "=" + options[key];
        }
        console.log(url)
        return url;
    };

    return {

        config: function() {
            return {
                id: 'dinoipsum',
                name: 'Dino Ipsum',
                api: 'http://dinoipsum.herokuapp.com/api/'
            };
        },
        createUrl: function() {
            return generateUrl();
        }

    };
})();
