function googlePlusSearch(keywords) {
    gapi.client.setApiKey("AIzaSyAY3GRPMaGoF2oCs5_RkxMeLNbdrxqLJnk");
    gapi.client.request({
        'path': 'https://www.googleapis.com/plus/v1/activities',
        'method': 'GET',
        'params': {
            'query': keywords
        },
        'callback': function (response) {
            var list = document.getElementById('mashup-tweets-list');
            
            for(var i = 0; i < response.items.length; i++) {
                var listItem = document.createElement('li');
                listItem.setAttribute("id", "googlePost" + i);
                list.appendChild(listItem);
                gapi.post.render("googlePost" + i, {'href' : response.items[i].url});
            }
        }
    });
}
