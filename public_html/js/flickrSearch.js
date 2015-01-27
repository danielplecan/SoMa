function flickrSearch(query) {

    $("#mashup-images-panel").html("");

    var apiKey = '74c57b56c7feaee2d9bd082f952db139';
    var tag = query;
    var perPage = '100';
    var showOnPageMashup = '20';
    var showOnPageTab = '100';

    $.getJSON('https://api.flickr.com/services/rest/?format=json&method='+
        'flickr.photos.search&api_key=' + apiKey +
        '&tags=' + tag + '&per_page=' + perPage + '&jsoncallback=?',
        function(data){

            $.each(data.photos.photo, function(i, rPhoto){
                var basePhotoURL = 'http://farm' + rPhoto.farm + '.static.flickr.com/'
                    + rPhoto.server + '/' + rPhoto.id + '_' + rPhoto.secret;

                // var photoTitle = rPhoto.title;
                var originalPhotoURL = basePhotoURL + "_o.jpg"
                var mashupPhotoURL = basePhotoURL + '_q.jpg';
                var PhotoURL = basePhotoURL + '_z.jpg';

                /*
                var photoStringStart = '<a ';
                var photoStringMashupEnd = 'title="' + rPhoto.title + '" href="'+
                    originalPhotoURL +'"><img src="' + mashupPhotoURL + '" class="mashup-images-panel-element" alt="' +
                    rPhoto.title + '"/></a>;'
                var photoStringTabEnd = 'title="' + rPhoto.title + '" href="'+
                    originalPhotoURL +'"><img src="' + tabPhotoURL + '"  class="mashup-images-panel-element" alt="' +
                    rPhoto.title + '"/></a>;'

                var photoStringMashup;
                var photoStringTab;
                */

                var imgContTab = '<div class="tab-images-panel-element" style="background: url(' + mashupPhotoURL + ');"><div class="image-info"><p class="top"><a class="title" href="' + PhotoURL + '">' + rPhoto.title + '</p></div></div>';
                var imgContMashup = '<div class="mashup-images-panel-element" style="background: url(' + mashupPhotoURL + ');"><div class="image-info"><p class="top"><a class="title" href="' + PhotoURL + '">' + rPhoto.title + '</p></div></div>';

                if(i < showOnPageMashup ){

                //photoStringMashup =  photoStringStart + photoStringMashupEnd;
                    $(imgContMashup).appendTo('#mashup-images-panel');
                //$(photoStringMashup).appendTo("#mashup-images-panel");

                }

                if(i < showOnPageTab ){
                    //photoStringTab = photoStringStart +  photoStringTabEnd;
                    //$(photoStringTab).appendTo("#mashup-images-panel-tab-flickr");
                    $(imgContTab).appendTo('#mashup-images-panel-tab-flickr');
                }

            });
        });
};

$(document).on("mouseover", '.mashup-images-panel-element', function(){
    $(this).children('div').attr('class', 'image-info-active-mashup');
});

$(document).on('mouseout', '.mashup-images-panel-element', function(){
    $(this).children('div').attr('class', 'image-info');
});

$(document).on("mouseover", '.tab-images-panel-element', function(){
    $(this).children('div').attr('class', 'image-info-active-tab');
});

$(document).on('mouseout', '.tab-images-panel-element', function(){
    $(this).children('div').attr('class', 'image-info');
});

