//Imports Here:
import { fetchTravelerInfo } from './apiCalls';
import { userLogsIn, findCurrentId } from './data-model';
import './css/styles.css';
import { displayCurrentTraveler } from './domUppdates';

//QuerySelectors Here:
const submitButton = document.querySelector('#submit');
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
