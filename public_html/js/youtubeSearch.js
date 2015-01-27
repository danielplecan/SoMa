var Videos = 'undefined';

function findAndCreate(){
// Find all the YouTube video embedded on a page
var videos = document.getElementsByClassName("youtube");

for (var i=0; i<videos.length; i++) {

    var youtube = videos[i];

    // Based on the YouTube ID, we can easily find the thumbnail image
    var img = document.createElement("img");
    img.setAttribute("src", "http://i.ytimg.com/vi/"
        + youtube.id + "/hqdefault.jpg");
    img.setAttribute("class", "thumb");


    // Overlay the Play icon to make it look like a video player
    var play = document.createElement("div");
    play.setAttribute("class","play");

    youtube.appendChild(img);
    youtube.appendChild(play);

    // Attach an onclick event to the YouTube Thumbnail
    youtube.onclick = function() {

        // Create an iFrame with autoplay set to true
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src",
            "https://www.youtube.com/embed/" + this.id
                + "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1");

        // The height and width of the iFrame should be the same as parent
        iframe.style.width  = this.style.width;
        iframe.style.height = this.style.height
        iframe.style.borderColor= "#eee #ddd #bbb";
        iframe.style.borderImage = "none";
        iframe.style.borderWidth = "1px";
        iframe.style.boxShadow = "1px 1px 5px #999";
        iframe.style.cursor = "pointer";
        iframe.style.marginBottom = "25px";
        iframe.style.overflow = "hidden";
        iframe.style.position = "relative";

        // Replace the YouTube thumbnail with YouTube HTML5 Player
        this.parentNode.replaceChild(iframe, this);

    };
}
}

function getResponse(response) {
    var video;
    var responseString = JSON.stringify(response);

    Videos = responseString;

    $("#mashup-videos-panel").html("");
    $("mashup-videos-panel-tab-youtube").html("");

    for(index=0; index< 5; index++){
    if(JSON.parse(Videos).items[index] === undefined){
        continue;
    }
    else{

    videoTitle = $("<h3>"+JSON.parse(Videos).items[index].snippet.title +"</h3>");
    video = $("<div itemprop='video' class='youtube' id='" +  JSON.parse(Videos).items[index].id.videoId  + "' style='width: 100%; height: 150px;'></div>");
    tabbedVideo = $("<div itemprop='video' class='youtube' id='" +  JSON.parse(Videos).items[index].id.videoId  + "' style='width: 40%; height: 225px; '></div>");
    $("#mashup-videos-panel").append(video);
    $("#mashup-videos-panel-tab-youtube").append(videoTitle).append(tabbedVideo);
    }
    }
    findAndCreate();
}

// Called automatically when JavaScript client library is loaded ( callback )
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded ( upper )
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
    search(youtubeSearch);
}

function youtubeSearch(query) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        q: query
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request ( upper )
function onSearchResponse(response) {
    getResponse(response);
}
