// export const singleTraveler = 'http://localhost:3001/api/v1/travelers'; //interpolate a /${id} GET
// export const allTrips = 'http://localhost:3001/api/v1/trips'; //GET
// export const allDestinations = 'http://localhost:3001/api/v1/destinations'; //GET
// export const newTrip = 'http://localhost:3001/api/v1/trips' //when the add new trip is clicked, this is initiated
// export const newDestination = 'http://localhost:3001/api/v1/destinations';
// export const modifySingleTrip = 'http://localhost:3001/api/v1/updateTrip';

import { currentTraveler } from "./data-model"
import { formattedDate } from "./scripts"

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
})

export const submitNewTrip = () => {
    console.log(formattedDate)
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    console.log(typeof numOfTravelers.value, 'numtraav')
    console.log(dateRegex.test(dateInput.value), 'regex')
    if (dateRegex.test(dateInput.value) && durationInput.value <= 30) {
        const trip = {
            date: dateInput.value,
            destinationID: 'blank',
            duration: durationInput.value,
            id: 'blank for now',
            status: 'pending',
            travelers: numOfTravelers.value,
            userID: currentTraveler.id
        }
        console.log(trip, 'trip')
    }
}