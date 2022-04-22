function getApi() {

    //variables for api calls
    var eventSearch = document.getElementById('searchInput').value;
    var searchTerm = 'keyword= ' + eventSearch; //;eventSearch;
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=5&countryCode=US&' + searchTerm + '&apikey=wZgkpanEfNFtRCE9bOFAr2ivj5h3evSw';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var table = document.getElementById('table-body');
            table.innerHTML = '';

            for (var i = 0; i < data._embedded.events.length; i++) {

                //event
                var event = data._embedded.events[i];

                //create table row
                var tr = document.createElement('tr');
                var name = document.createElement('td');
                var date = document.createElement('td');
                var time = document.createElement('td');

                //create details btn
                var details = document.createElement('button');
                details.setAttribute('class', 'button is-primary');
                details.textContent = 'Details';
                details.setAttribute('onclick', 'getDetails(\'' + event.id + '\')');

                //buy tickets button
                var buyTickets = document.createElement('a');
                buyTickets.setAttribute('class', 'button is-warning');
                buyTickets.textContent = 'Tickets';
                buyTickets.setAttribute('href', event.url);
                buyTickets.setAttribute('target', '_blank');

                //add text to tr in td
                name.textContent = event.name;
                date.textContent = event.dates.start.localDate;
                time.textContent = event.dates.start.localTime;

                //appending data to tr then to table 
                tr.append(name);
                tr.append(date);
                tr.append(time);
                tr.append(details);
                tr.append(buyTickets);
                table.append(tr);
            }
        })
}

function getDetails(id) {

    fetch('https://app.ticketmaster.com/discovery/v2/events/' + id + '.json?apikey=wZgkpanEfNFtRCE9bOFAr2ivj5h3evSw')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var descBox = document.getElementById('eventDesc');
            descBox.innerHTML = '';

            //creating img then appending img to img container
            var image = document.createElement('img');
            image.setAttribute('src', data.images[0].url);
            console.log(descBox);
            descBox.append(image);

            //create ul
            var ul = document.createElement('ul');
            var name = document.createElement('li');
            var venue = document.createElement('li');

            //add text to li in ul
            name.textContent = "Artist name: " + data.name;
            venue.textContent = "Venue name: " + data._embedded.venues[0].name;

            //appending li to ul then to description box
            ul.append(name);
            ul.append(venue);
            descBox.append(ul);

        })
}



