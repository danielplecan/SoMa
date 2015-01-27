function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return(false);
}


$(document).ready(function () {
    $(document).on('click', '#mashupButton', function () {
        var query = document.getElementById("focusedInput").value;
        twitterSearch(query);
        flickrSearch(query);
        youtubeSearch(query);
        googleMapsSearch(query);
        googlePlusSearch(query);
    });
});

function search(youtubeSearch) {
    var searchQuery = getQueryVariable("query");
    twitterSearch(searchQuery);
    flickrSearch(searchQuery);
    youtubeSearch(searchQuery);
    googleMapsSearch(searchQuery);
    googlePlusSearch(searchQuery);
}


