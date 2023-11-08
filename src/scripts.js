//Imports Here:
import { allDestinations, allTravelers, allTrips, fetchTravelerInfo, urls } from './apiCalls';
import { userLogsIn, findCurrentId } from './data-model';
import './css/styles.css';

//QuerySelectors Here:
const submitButton = document.querySelector('#submit');
export let allTravelersData 
//Dom Update Variables Here:

//Event Listeners Here:
window.addEventListener('load', function() {
    // console.log('hi')
    Promise.all([fetchTravelerInfo(allTravelers)]).then(values => {
        console.log(values)
    })
})

submitButton.addEventListener('click', function(event) {
    console.log(allTravelersData, 'inside button')
    event.preventDefault();
    findCurrentId();
})
