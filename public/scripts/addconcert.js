console.log('ADDCONCERT is connected...');

const form = document.getElementById('addConcert');

/* --------- Submit Form Event Listener ---------- */
form.addEventListener('submit', handleConcertSubmit);

/* --------- Handle Submit ---------- */
function handleConcertSubmit(event) {
    let formIsValid = true;
    event.preventDefault();

    const artist = document.getElementById('artist').value;
    const date = document.getElementById('example-date-input').value;
    const venue = document.getElementById('searchTextField').value;
    const city2 = document.getElementById('city2').value;
    const cityLat = document.getElementById('cityLat').value;
    const cityLng = document.getElementById('cityLng').value;
    const weather = document.getElementById('weather').value;
    const concertBuddies = document.getElementById('concertBuddies').value;
    
    const concertData = {
        artist: artist,
        date: date,
        venue: venue,
        city2: city2,
        cityLat: cityLat,
        cityLng: cityLng,
        weather: weather,
        concertBuddies: concertBuddies,
    }

    const formInputs = [...form.elements];
    formInputs.forEach((input) => {
        input.classList.remove('input-error');
        if (input.type !== 'submit' && input.value === '') {
            formIsValid = false;
            input.classList.add('input-error');
        }

        if (formIsValid) {
            concertData[input.name] = input.value;
        }
    });

    if (formIsValid) {
        console.log('Submitting CONCERT DATA', concertData)
        fetch('api/v1/concert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(concertData),
        })
            .then((dataStream) => dataStream.json())
            .then((dataObj) => {
                console.log(dataObj);
                // window.location = '/profile';
            })
            .catch((error) => console.log(error));
    }
};



/* --------- Place Venue on Google Maps on Profile Screen ---------- */
function initialize() {
    const input = document.getElementById('searchTextField');
    const autocomplete = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            const place = autocomplete.getPlace();
            document.getElementById('city2').value = place.name;
            document.getElementById('cityLat').value = place.geometry.location.lat();
            document.getElementById('cityLng').value = place.geometry.location.lng();
        });
}

google.maps.event.addDomListener(window, 'load', initialize);