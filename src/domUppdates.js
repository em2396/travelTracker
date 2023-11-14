import { currentTraveler } from './data-model.js'

export const userDash = document.querySelector('#userDash');
export const pastTravel = document.querySelector('#pastTravel');
export const pendingTravel = document.querySelector('#pendingTravel');
export const upcomingTravel = document.querySelector('#upcomingTravel');
const totalSpending = document.querySelector('#totalSpending');
const destinationList = document.querySelector('#destinationList');
const estimatedCost = document.querySelector('#estimatedCost');


export const displayFirst = (past, upcoming, pending) => {
    userDash.innerText = currentTraveler.name;
    pendingTravel.classList.add('hidden');
    upcomingTravel.classList.add('hidden');
    pastTravel.classList.remove('hidden');
    pendingTravel.innerHTML = '';
    pastTravel.innerHTML = '';
    upcomingTravel.innerHTML = '';
    past.forEach(element => {
        pastTravel.innerHTML += `The date of the trip is ${element.date} and the destination id is ${element.destinationID}. `;
    });
    upcoming.forEach(element => {
        upcomingTravel.innerHTML += `The date of the trip is ${element.date} and the destination id is ${element.destinationID}`;
    });
    pending.forEach(element => {
        pendingTravel.innerHTML += `The date of the trip is ${element.date} and the destination id is ${element.destinationID}`;
    });
}


export const displayPast = (past) => {
    console.log(past, 'past')
    userDash.innerText = currentTraveler.name;
    pendingTravel.classList.add('hidden');
    upcomingTravel.classList.add('hidden');
    pastTravel.classList.remove('hidden');
};

export const displayUpcoming = (upcoming) => {
    userDash.innerText = currentTraveler.name;
    pendingTravel.classList.add('hidden');
    upcomingTravel.classList.remove('hidden');
    pastTravel.classList.add('hidden');
};

export const displayPending = pending => {
    console.log(pending, 'pending')
    userDash.innerText = currentTraveler.name;
    pendingTravel.classList.remove('hidden');
    upcomingTravel.classList.add('hidden');
    pastTravel.classList.add('hidden');
};

export const displayTotalCost = total => {
    totalSpending.innerText = `The total cost for this year is $${total}`;
};

export const dropdownDestinations = destinationAll => {
    destinationAll.forEach(element => {
       destinationList.innerHTML += `<option>${element.destination}</option>`
    });
};

export const displayEstimatedCost = total => {
    estimatedCost.innerHTML = `The estimated cost for your trip is: $${total}. Press submit to send to an agent.`
};