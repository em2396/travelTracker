// export const singleTraveler = 'http://localhost:3001/api/v1/travelers'; //interpolate a /${id} GET
// export const allTrips = 'http://localhost:3001/api/v1/trips'; //GET
// export const allDestinations = 'http://localhost:3001/api/v1/destinations'; //GET
// export const newTrip = 'http://localhost:3001/api/v1/trips' //when the add new trip is clicked, this is initiated
// export const newDestination = 'http://localhost:3001/api/v1/destinations';
// export const modifySingleTrip = 'http://localhost:3001/api/v1/updateTrip';

import { currentTraveler } from "./data-model"
import { formattedDate, allDestinations, allTrips} from "./scripts"

export const urls = ['http://localhost:3001/api/v1/travelers','http://localhost:3001/api/v1/trips', 'http://localhost:3001/api/v1/destinations']

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
});

export const sendNewTrip = tripInfo => {
   return fetch ('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(tripInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error (`${response.status}: Failed to fetch data`)
        }
        // console.log(response);
       return response.json()
    })
    .then (json => {
        // console.log(json, 'json')
        allTrips.push(json);
        // console.log(allTrips);

    })
}

//duration and travelers neeed to benumbers
export const submitNewTrip = () => {
    const destInput = allDestinations.find(element => {
       return element.destination === chooseDestination.value
    });
    const destID = destInput.id;
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    const duration = parseInt(durationInput.value);
    const numOfPeople = parseInt(numOfTravelers.value);
    if (dateRegex.test(dateInput.value) && durationInput.value <= 30 && typeof numOfPeople === 'number') {
        const trip = {
            id: allTrips.length + 1,
            userID: currentTraveler.id,
            destinationID: destID,
            travelers: numOfPeople,
            date: dateInput.value,
            duration: duration,
            status: 'pending'
        }
        console.log(trip, 'trip')
        sendNewTrip(trip);
        return trip;
    }
}