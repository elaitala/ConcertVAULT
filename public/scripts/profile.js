$(document).ready(function(){
    console.log("Lets find those venues!");

    const onSuccess = response => {
        const { features } = response;
        console.log({ domData: features });

        features.forEach(venue => {
            console.log({venue});
            const {geometry} = venue;
            const {coordinates} = geometry;

            const sf = {lat: coordinates[1], lng: coordinates[0]};
            console.log(sf)

            const marker = new google.maps.Marker(
                {position: sf,
                map: map,
                icon: iconBase,
            });
        });
    }

    const onError = (error, errorText, errorCode) => {
        console.log({ error })
    };

    $.ajax ({
        method: 'GET',
        url: 'http://localhost:3000/profile',
        success: onSuccess,
        error: onError,
    });

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.78, lng: -122.44},
        zoom: 9
    });
});

