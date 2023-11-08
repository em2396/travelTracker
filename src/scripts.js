//Imports Here:
import { allDestinations, allTravelers, allTrips, fetchTravelerInfo } from './apiCalls';
import { userLogsIn, findCurrentId } from './data-model';
import './css/styles.css';

//QuerySelectors Here:
const submitButton = document.querySelector('#submit');

//Dom Update Variables Here:
const allTravelersData = fetchTravelerInfo(allTravelers);
const allTripsData = fetchTravelerInfo(allTrips);
const allDestinationsData = fetchTravelerInfo(allDestinations);

console.log(allTripsData, 'all trips data')
console.log(allTravelersData, 'all travelers data');
console.log(allDestinationsData, 'destinations data');

//Even Listeners Here:
submitButton.addEventListener('click', function() {
    // event.preventDefault()
    findCurrentId();
})
