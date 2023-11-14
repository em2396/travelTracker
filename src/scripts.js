//Imports Here:
import { fetchTravelerInfo } from './apiCalls';
import { findCurrentId, upcoming, past, pending, newTrip } from './data-model';
import './css/styles.css';
import { displayPast, displayUpcoming, displayPending } from './domUppdates';

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
        allTravelersData = values[0].travelers;
        allTrips = values[1].trips;
        allDestinations = values[2].destinations;
        console.log(allTrips)
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
    findCurrentId(username.value);
});

submitButton.addEventListener('keydown', function(event) {
    event.preventDefault();
    if (event.code === 'Enter' || event.code === 'Space') {
        findCurrentId(username.value);
    }
});

upcomingButton.addEventListener('click', function() {
    displayUpcoming(upcoming);
});

upcomingButton.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === 'Space') {
        console.log('keyed>>>>>>>>.')
        displayUpcoming(upcoming);
    };
});

pendingButton.addEventListener('click', function() {
    displayPending(pending);
});

pendingButton.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === 'Space') {
        displayPending(pending);
    }
});

pastButton.addEventListener('click', function() {
    displayPast(past);
});

pastButton.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === 'Space') {
     displayPast(past)
    };
});


submitTrip.addEventListener('click', function() {
    newTrip('submit');
});

submitTrip.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === 'Space') {
        newTrip('submit');
    };
});

estimatedCostButton.addEventListener('click', function() {
    newTrip('estimate');
});

estimatedCostButton.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === 'Space') {
        newTrip('estimate');
    };
});

