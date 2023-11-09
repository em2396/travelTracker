//Imports Here:
import { allDestinations, allTravelers, allTrips, fetchTravelerInfo, urls } from './apiCalls';
import { userLogsIn, findCurrentId } from './data-model';
import './css/styles.css';
import { displayCurrentTraveler } from './domUppdates';

//QuerySelectors Here:
const submitButton = document.querySelector('#submit');
export let allTravelersData; 
export let currentTraveler;

//Event Listeners Here:
window.addEventListener('load', function() {
    Promise.all(fetchTravelerInfo).then(values => {
        allTravelersData = values[0].travelers;
    })
})

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    findCurrentId();
})
