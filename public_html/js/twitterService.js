function twitterSearch(query) {
    OAuth.initialize('NUzclKmeAT45GJaDVan7gJI9s1g');

    var twitter = OAuth.create('twitter');

    if (twitter !== false) {
        searchTweets(twitter, query);
    } else {
        $("#twitterLoginBtn").removeClass("hidden");
    }
}

function twitterLogin() {
    OAuth.popup('twitter', {cache: true})
            .done(function (twitter) {
                alert("Twitter authentication successful. You can now use this provider during your searches.");
                $("#twitterLoginBtn").addClass("hidden");
            })
            .fail(function () {
                alert("Twitter authentication failed. Cannot provide results from this social media provider. Please try again.");
                $("#twitterLoginBtn").removeClass("hidden");
            });

}

$(document).ready(function() {
    OAuth.initialize('NUzclKmeAT45GJaDVan7gJI9s1g');
    
    $(document).on('click', '#twitterLoginBtn', function () {
        event.preventDefault();
        twitterLogin();
    });
    

    var twitter = OAuth.create('twitter');

    if (twitter !== false) {
        $("#twitterLoginBtn").addClass("hidden");
    } else {
        $("#twitterLoginBtn").removeClass("hidden");
    }
});

function searchTweets(twitter, keywords) {
    keywords = keywords.replace(" ", " OR ");
    keywords = encodeURI(keywords);

    twitter.get("/1.1/search/tweets.json?q=" + keywords + "&result_type=recent")
            .done(function (data) {
                renderTweets(twitter, data);
            })
            .fail(function () {
                alert("Search for tweets has failed. Please try again.");
            });
}

function renderTweets(twitter, data) {
    for (var i = 0; i < data.statuses.length; i++) {
        var url = "https://api.twitter.com/1.1/statuses/oembed.json?id="
                + data.statuses[i].id +
                "&hide_media=true&hide_thread=true";

        twitter.get(url).done(function (data) {
            var tweet = $("<li />");
            $(tweet).html(data.html);
            $("#mashup-tweets-list").append(tweet);

            var tweet = $("<li />");
            $(tweet).html(data.html);
            $("#mashup-twitter-stories-list").append(tweet);
        });
    }
}

function googleMapsSearch(query) {
    document.getElementById('mashup-map').contentWindow.mapsSearch(query);
    document.getElementById('stories-map').contentWindow.mapsSearch(query);
    document.getElementById('images-map').contentWindow.mapsSearch(query);
    document.getElementById('videos-map').contentWindow.mapsSearch(query);
}