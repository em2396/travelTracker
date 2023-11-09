
// export const allTravelers = 'http://localhost:3001/api/v1/travelers'; //GET
// export const singleTraveler = 'http://localhost:3001/api/v1/travelers'; //interpolate a /${id} GET
// export const allTrips = 'http://localhost:3001/api/v1/trips'; //GET
// export const allDestinations = 'http://localhost:3001/api/v1/destinations'; //GET
// export const newTrip = 'http://localhost:3001/api/v1/trips' //when the add new trip is clicked, this is initiated
// export const newDestination = 'http://localhost:3001/api/v1/destinations';
// export const modifySingleTrip = 'http://localhost:3001/api/v1/updateTrip';

export const urls = ['http://localhost:3001/api/v1/travelers','http://localhost:3001/api/v1/trips' ]

export const fetchTravelerInfo = urls.map(url => {
   return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error (`${response.status}: Failed to fetch data`)
            }
            return response.json()
        })
        .then((data) => {
            return data;
        })
})

// export const fetchTravelerInfo = travelerData => {
//     return fetch(travelerData)
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             console.log(data, 'api');
//             return data
//         })
// }