//Imports Here:
import { fetchTravelerInfo, submitNewTrip } from './apiCalls';
import { findCurrentId, upcoming, past, pending } from './data-model';
import './css/styles.css';
import { displayPast, displayUpcoming, displayPending } from './domUppdates';
//clean up ^^^

//QuerySelectors Here:
const submitButton = document.querySelector('#submit');
const upcomingButton = document.querySelector('#upcomingButton');
const pendingButton = document.querySelector('#pendingButton');
const pastButton = document.querySelector('#pastButton');
const submitTrip = document.querySelector('#submitTrip');
const estimatedCostButton = document.querySelector('#estimatedCostButton');


//Variable Here;
export let allTravelersData; 
export let allTrips;
export let currentTraveler;
export let allDestinations;
export let formattedDate;

//Event Listeners Here:
window.addEventListener('DOMContentLoaded', function() {
    Promise.all(fetchTravelerInfo).then(values => {
        console.log(values, 'inside promise');
        allTravelersData = values[0].travelers;
        allTrips = values[1].trips;
        allDestinations = values[2].destinations;

        const picker = datepicker(dateInput, {
            onSelect: (instance, date) => {
              formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
              dateInput.value = formattedDate
              return formattedDate;
            },
            startDate: new Date (2023, 12, 12),
          });
    });
});

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

submitTrip.addEventListener('click', function() {
    submitNewTrip()
});

estimatedCostButton.addEventListener('click', function() {
    estimateNewTripCost()
});

