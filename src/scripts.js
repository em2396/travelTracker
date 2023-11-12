//Imports Here:
import { fetchTravelerInfo } from './apiCalls';
import { findCurrentId, upcoming, past, pending } from './data-model';
import './css/styles.css';
import { displayPast, displayUpcoming, displayPending } from './domUppdates';
//clean up ^^^

//QuerySelectors Here:
const submitButton = document.querySelector('#submit');
const upcomingButton = document.querySelector('#upcomingButton');
const pendingButton = document.querySelector('#pendingButton');
const pastButton = document.querySelector('#pastButton');
export let allTravelersData; 
export let allTrips;
export let currentTraveler;
export let allDestinations;

//Event Listeners Here:
window.addEventListener('load', function() {
    Promise.all(fetchTravelerInfo).then(values => {
        console.log(values, 'inside promise');
        allTravelersData = values[0].travelers;
        allTrips = values[1].trips;
        allDestinations = values[2].destinations;
    })
})

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    findCurrentId();
})

upcomingButton.addEventListener('click', function() {
    displayUpcoming(upcoming)
});

pendingButton.addEventListener('click', function() {
    displayPending(pending)
});

pastButton.addEventListener('click', function() {
    displayPast(past)
});

