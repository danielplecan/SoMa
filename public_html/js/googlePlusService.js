function googlePlusSearch(keywords) {
    gapi.client.setApiKey("AIzaSyAY3GRPMaGoF2oCs5_RkxMeLNbdrxqLJnk");
    gapi.client.request({
        'path': 'https://www.googleapis.com/plus/v1/activities',
        'method': 'GET',
        'params': {
            'query': keywords,
            'maxResults': 5
        },
        'callback': function (response) {
            var listOne = document.getElementById('mashup-tweets-list');
            var listTwo = document.getElementById('mashup-google-stories-list');
            
            for(var i = 0; i < response.items.length; i++) {
                var listItemOne = document.createElement('li');
                listItemOne.setAttribute("id", "googlePostOne" + i);
                listOne.appendChild(listItemOne);
                gapi.post.render("googlePostOne" + i, {'href' : response.items[i].url});
                
                var listItemTwo = document.createElement('li');
                listItemTwo.setAttribute("id", "googlePostTwo" + i);
                listTwo.appendChild(listItemTwo);
                gapi.post.render("googlePostTwo" + i, {'href' : response.items[i].url});
            }
        }
    });
}
