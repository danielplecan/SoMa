function getQueryVariable(variable)
{
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

$(document).ready(function() {
    $(document).on('click', '#mashupButton', function () {
        var query = document.getElementById("focusedInput").value;
        if (query !== "") {
            clear();
            twitterSearch(query);
            flickrSearch(query);
            youtubeSearch(query);
            googlePlusSearch(query);
            googleMapsSearch(query);
        }
    });
});


function search(youtubeSearch) {
    var searchQuery = getQueryVariable("query");
    if (searchQuery !== "") {
        clear();
        twitterSearch(searchQuery);
        flickrSearch(searchQuery);
        youtubeSearch(searchQuery);
        googlePlusSearch(searchQuery);
        googleMapsSearch(searchQuery);
    }
}

function clear() {
    $("#mashup-videos-panel").empty();
    $("#mashup-videos-panel-tab-youtube").empty();
    $("#mashup-images-panel").empty();
    $('#mashup-images-panel-tab-flickr').empty();
    $("#mashup-tweets-list").empty();
    $("#mashup-twitter-stories-list").empty();
    $("#mashup-google-stories-list").empty();
    $("#mashup-videos-panel-tab-youtube").empty();

}
