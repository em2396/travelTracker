import { currentTraveler } from './data-model.js'

const userDash = document.querySelector('#userDash');
const pastTravel = document.querySelector('#pastTravel');
const totalSpending = document.querySelector('#totalSpending');





export const displayCurrentTraveler = (past, upcoming, pending) => {
    // console.log(current, 'current');
    // console.log(currentTrips, 'current trips')
    // console.log(currentTraveler, 'traveler')
    userDash.innerText = currentTraveler.name;
    past.forEach(element => {
        pastTravel.innerHTML += `The date of the trip is $${element.date} and the destination id is ${element.destinationID}`;
    })
};

export const displayTotalCost = total => {
    totalSpending.innerText = `The total cost for this year is ${total}`;
}