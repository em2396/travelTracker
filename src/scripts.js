//Imports Here:
import { allDestinations, fetchTravelerInfo, urls } from './apiCalls';
import { userLogsIn, findCurrentId } from './data-model';
import './css/styles.css';
import { displayCurrentTraveler } from './domUppdates';

//QuerySelectors Here:
const submitButton = document.querySelector('#submit');
export let allTravelersData; 
export let allTrips;
export let currentTraveler;

//Event Listeners Here:
window.addEventListener('load', function() {
    Promise.all(fetchTravelerInfo).then(values => {
        console.log(values);
        allTravelersData = values[0].travelers;
        allTrips = values[1].trips;
        // console.log(allTrips)
    })
})

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    findCurrentId();
})
