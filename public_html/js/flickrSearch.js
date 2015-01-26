function flickrSearch() {

    $("#mashup-images-panel").html("");

    var apiKey = '74c57b56c7feaee2d9bd082f952db139';
    var tag = document.getElementById("focusedInput").value;
    var perPage = '100';
    var showOnPageMashup = '20';
    var showOnPageTab = '100';

    console.log('https://api.flickr.com/services/rest/?format=json&method=' + 'flickr.photos.search&api_key=' + apiKey + '&tags=' + tag + '&per_page=' + perPage + '&jsoncallback=?');

    $.getJSON('https://api.flickr.com/services/rest/?format=json&method='+
        'flickr.photos.search&api_key=' + apiKey +
        '&tags=' + tag + '&per_page=' + perPage + '&jsoncallback=?',
        function(data){

            $.each(data.photos.photo, function(i, rPhoto){
                var basePhotoURL = 'http://farm' + rPhoto.farm + '.static.flickr.com/'
                    + rPhoto.server + '/' + rPhoto.id + '_' + rPhoto.secret;

                var originalPhotoURL = basePhotoURL + "_o.jpg"
                var mashupPhotoURL = basePhotoURL + '_q.jpg';
                var tabPhotoURL = basePhotoURL + '_m.jpg';

                var photoStringStart = '<a ';
                var photoStringMashupEnd = 'title="' + rPhoto.title + '" href="'+
                    originalPhotoURL +'"><img src="' + mashupPhotoURL + '" class="mashup-images-panel-element" alt="' +
                    rPhoto.title + '"/></a>;'
                var photoStringTabEnd = 'title="' + rPhoto.title + '" href="'+
                    originalPhotoURL +'"><img src="' + tabPhotoURL + '"  class="mashup-images-panel-element" alt="' +
                    rPhoto.title + '"/></a>;'

                var photoStringMashup;
                var photoStringTab;

                if(i < showOnPageMashup ){

                photoStringMashup =  photoStringStart + photoStringMashupEnd;
                $(photoStringMashup).appendTo("#mashup-images-panel");

                }

                if(i < showOnPageTab ){
                    photoStringTab = photoStringStart +  photoStringTabEnd;
                    $(photoStringTab).appendTo("#mashup-images-panel-tab-flickr");
                }

            });
        });
};