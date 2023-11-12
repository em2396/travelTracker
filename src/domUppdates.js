import { currentTraveler } from './data-model.js'

const userDash = document.querySelector('#userDash');
export const pastTravel = document.querySelector('#pastTravel');
export const pendingTravel = document.querySelector('#pendingTravel');
export const upcomingTravel = document.querySelector('#upcomingTravel');
const totalSpending = document.querySelector('#totalSpending');





export const displayPast = (past) => {
    console.log(past, 'past')
    userDash.innerText = currentTraveler.name;
    upcomingTravel.innerHTML = '';
    pendingTravel.innterHTML = '';
    past.forEach(element => {
        pastTravel.innerHTML += `The date of the trip is ${element.date} and the destination id is ${element.destinationID}. `;
    });
};

export const displayUpcoming = (upcoming) => {
    userDash.innerText = currentTraveler.name;
    pastTravel.innerHTML = '';
    pendingTravel.innterHTML = '';
    upcoming.forEach(element => {
        upcomingTravel.innerHTML += `The date of the trip is ${element.date} and the destination id is ${element.destinationID}`;
    });
};

export const displayPending = pending => {
    console.log(pending, 'pending')
    userDash.innerText = currentTraveler.name;
    upcomingTravel.innerHTML = '';
    pastTravel.innterHTML = '';
    pending.forEach(element => {
        pendingTravel.innerHTML += `The date of the trip is ${element.date} and the destination id is ${element.destinationID}`;
    });
};

export const displayTotalCost = total => {
    totalSpending.innerText = `The total cost for this year is ${total}`;
}