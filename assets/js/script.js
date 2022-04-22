function getApi() {

    var eventList = document.querySelector('ul');
    var eventSearch = document.getElementById('searchInput').value;

    var searchTerm = 'keyword= ' + eventSearch; //;eventSearch;
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=5&countryCode=US&' + searchTerm + '&apikey=wZgkpanEfNFtRCE9bOFAr2ivj5h3evSw';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            var table = document.getElementById('table-body');
            table.innerHTML = '';

            for (var i = 0; i < data._embedded.events.length; i++) {

                //Event
                var event = data._embedded.events[i];

                //Create table row
                var tr = document.createElement('tr');
                var name = document.createElement('td');
                var date = document.createElement('td');
                var time = document.createElement('td');

                //create details btn
                var details = document.createElement('button');
                details.setAttribute('class', 'button is-warning');
                details.textContent = 'Details';
                details.setAttribute('onclick', 'getDetails(\'' + event.id + '\')');


                //add text to td
                name.textContent = event.name;
                date.textContent = event.dates.start.localDate;
                time.textContent = event.dates.start.localTime;

                tr.append(name);
                tr.append(date);
                tr.append(time);
                tr.append(details);

                table.append(tr);

            }

        })


}




