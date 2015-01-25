(function () {
    OAuth.initialize('NUzclKmeAT45GJaDVan7gJI9s1g');
    
    OAuth.popup('twitter', {cache: true}).done(function (twitter) {
        alert("IEEEI");
        console.log(twitter);
        twitter.get("/1.1/search/tweets.json?q=%23superbowl&result_type=recent").done(function (data) {
            console.log(data.statuses[0].id);
            twitter.get("https://api.twitter.com/1.1/statuses/oembed.json?id=507185938620219395").done(function(data){
                console.log(data.html);
                $("#mashup").html(data.html);
            });
            
        }).fail(function (err) {
            console.log(err);
        });
    }).fail(function (err) {
        //todo when the OAuth flow failed
    });
})();