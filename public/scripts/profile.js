console.log('Pulling the PROFILE...');



const addConcert = document.getElementById('add-concert');

// APP state
let userProfile = '';
// console.log(currentUser);

// const username = document.getElementById('user').value;
// // const password = document.getElementById('password').value;

// const userData = {
//     // email: email,
//     username: username,
//     // password: password,
// }


function getUser() {
    console.log('Getting current USER...', userProfile)
    fetch('api/v1/user', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'credentials': 'include',
    },
    //   body: JSON.stringify(userData),
    })
        .then(console.log('Got this far...1'))
        .then((dataStream) => dataStream.json())
      // .then(console.log('Got this far...2'))
        .then((dataObj) => {
        
        renderProfile(dataObj) 

    })
        .catch((err) => console.log(err));
    //   console.log(userProfile);
    //   console.log(dataObj.data.username);

};

getUser();

console.log(userProfile);
//   console.log(profileEmail);
//   console.log(profileDate);

function renderProfile(dataObj) {
    console.log(dataObj.data.username);
    console.log('Rendering...)');
    const title = document.getElementById('title');

    title.innerHTML = "";
    title.innerHTML = `Rock on, ${dataObj.data.username}!`;

    const email = document.getElementById('email');

    email.innerHTML = "";
    email.innerHTML = `Email: <br>${dataObj.data.email}`;

    const since = document.getElementById('member');

    since.innerHTML = "";
    since.innerHTML = `Member since: <br>${new Date(dataObj.data.createdAt).toUTCString().slice(7, 16)}`;

    const concerts = document.getElementById('concerts');

    concerts.innerHTML = "";
    concerts.innerHTML = `Concerts: <br> ${dataObj.data.concerts}`;


}


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
        url: 'http://localhost:3000/addconcert',
        success: onSuccess,
        error: onError,
    });

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.78, lng: -122.44},
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
            ]
        });
    });


