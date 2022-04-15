var eventList = document.querySelector('ul');
var eventSearch = document.getElementById('search-button');

function getApi(search) {
    var searchTerm = 'keyword= ' + search
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=wZgkpanEfNFtRCE9bOFAr2ivj5h3evSw'

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

getApi();