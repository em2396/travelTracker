import { currentTraveler } from './data-model.js'

export const userDash = document.querySelector('#userDash');
export const pastTravel = document.querySelector('#pastTravel');
export const pendingTravel = document.querySelector('#pendingTravel');
export const upcomingTravel = document.querySelector('#upcomingTravel');
const totalSpending = document.querySelector('#totalSpending');
const destinationList = document.querySelector('#destinationList');
const estimatedCost = document.querySelector('#estimatedCost');
const login = document.querySelector('.login');
const travelInfo = document.querySelector('.travel-info');
const popup = document.querySelector('#popup');


export const displayFirst = (past, upcoming, pending, allDestinations) => {
    userDash.innerText = currentTraveler.name;
    pendingTravel.classList.add('hidden');
    upcomingTravel.classList.add('hidden');
    pastTravel.classList.remove('hidden');
    pendingTravel.innerHTML = '';
    pastTravel.innerHTML = '';
    upcomingTravel.innerHTML = '';
    dateInput.value = '';
    durationInput.value = '';
    numOfTravelers.value = '';
    chooseDestination.value = '';
    past.forEach(element => {
        const destination = allDestinations.find(dest => dest.id === element.destinationID);
        pastTravel.innerHTML += `Date of Trip: ${element.date} Destination: ${destination.destination}. 
        <img src="${destination.image}" alt=${destination.alt}width="200" height="150">`;
    });
    upcoming.forEach(element => {
        const destination = allDestinations.find(dest => dest.id === element.destinationID);
        upcomingTravel.innerHTML += `Date of Trip: ${element.date} Destination: ${destination.destination}. 
        <img src="${destination.image}" alt=${destination.alt}width="200" height="150">`;
    });
    pending.forEach(element => {
        const destination = allDestinations.find(dest => dest.id === element.destinationID);
        pendingTravel.innerHTML += `Date of Trip: ${element.date} Destination: ${destination.destination}. 
        <img src="${destination.image}" alt=${destination.alt}width="200" height="150">`;
    });
};

export const hideLoginWindow = () => {
    login.classList.add('hidden');
    travelInfo.classList.remove('hidden');
};


export const displayPast = (past) => {
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

export const displayPopup = () => {
    popup.style.display = 'block';
    setTimeout(function() {
        popup.style.display = 'none';
    }, 2500);
}