// export const singleTraveler = 'http://localhost:3001/api/v1/travelers'; //interpolate a /${id} GET
// export const allTrips = 'http://localhost:3001/api/v1/trips'; //GET
// export const allDestinations = 'http://localhost:3001/api/v1/destinations'; //GET
// export const newTrip = 'http://localhost:3001/api/v1/trips' //when the add new trip is clicked, this is initiated
// export const newDestination = 'http://localhost:3001/api/v1/destinations';
// export const modifySingleTrip = 'http://localhost:3001/api/v1/updateTrip';

import { currentTraveler, past, upcoming, pending } from "./data-model"
import { displayFirst } from "./domUppdates";
import { allDestinations, allTrips} from "./scripts"

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
       return response.json()
    })
    .then (json => {
        console.log(json, 'json')
        allTrips.push(json);
        console.log(allTrips);
        pending.push(tripInfo);
        console.log(pending, 'new pending')
        displayFirst(past, upcoming, pending);
    })
}

export const submitNewTrip = () => {
    console.log(allTrips, 'all trips');
    const destInput = allDestinations.find(element => {
       return element.destination === chooseDestination.value
    });
    const destID = destInput.id;
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    const duration = parseInt(durationInput.value);
    const numOfPeople = parseInt(numOfTravelers.value);
    if (dateRegex.test(dateInput.value) && durationInput.value <= 30 && typeof numOfPeople === 'number') {
        const trip = {
            date: dateInput.value,
            destinationID: destID,
            duration: duration,
            id: allTrips.length + 1,
            status: 'pending',
            suggestedActivities: [],
            travelers: numOfPeople,
            userID: currentTraveler.id
        }
        console.log(trip, 'trip')
        sendNewTrip(trip);
        return trip;
    }
}