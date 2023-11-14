import { past, upcoming, pending } from "./data-model"
import { displayFirst } from "./domUppdates";
import {  allTrips } from "./scripts"

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
};

