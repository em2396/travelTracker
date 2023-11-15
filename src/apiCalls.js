import { past, upcoming, pending } from "./data-model"
import { displayFirst, displayPopup } from "./domUppdates";
import {  allDestinations, allTrips } from "./scripts"

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
        allTrips.push(json);
        pending.push(tripInfo);
        displayFirst(past, upcoming, pending, allDestinations);
        displayPopup();
    })
};

