(function () {
    OAuth.initialize('NUzclKmeAT45GJaDVan7gJI9s1g');
    
    OAuth.popup('twitter', {cache: true}).done(function (twitter) {
        twitter = OAuth.create('twitter');
        console.log(twitter);
        twitter.get("/1.1/search/tweets.json?q=%23superbowl&result_type=recent").done(function (data) {
            
            for(var i = 0; i < data.statuses.length; i++) {
                twitter.get("/1.1/statuses/oembed.json?id=" + data.statuses[i].id + "&hide_media=true&hide_thread=true").done(function (data) {
                    var tweet = $("<div class='panel-body' />");
                    $(tweet).html(data.html);
                    $("#tweets").append(tweet);
                });
            }
            
        }).fail(function (err) {
            console.log(err);
        });
    }).fail(function (err) {
        //todo when the OAuth flow failed
    });
})();