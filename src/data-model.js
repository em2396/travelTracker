//Imports Here: 
import { allTravelersData, allTrips } from "./scripts";
import { displayCurrentTraveler } from "./domUppdates";

//QuerySelectors Here: 
const login = document.querySelector('.login');
const loginWindow = document.querySelector('.login-window');
const travelInfo = document.querySelector('.travel-info');

//Variables Here:
let currentId 
let currentTraveler



//Functions Here
export const findCurrentId = () => {
    let splitValues = username.value.split('traveler')
    currentId = splitValues[1]
    userLogsIn(currentId)
    return currentId;
};

export const userLogsIn = () => {
    if (username.value === `traveler${currentId}` && password.value === 'travel') {
        login.classList.add('hidden');
        travelInfo.classList.remove('hidden');
       return  findCurrentTraveler(allTravelersData);
    }
};

const findCurrentTraveler = allTravelers => {
    currentTraveler = allTravelers.find(user => {
        return user.id == currentId;
    })
    travelerTripData(currentTraveler, allTrips);
    return currentTraveler;
};

//trips [... {id: 1, destinationID: 49, duration: 8, id: 1, suggestedActivities: [], statues: 'approved', travelers: 1, userID: 44 }...]
export const travelerTripData = (currentTraveler, trips) => {
    const currentTravelerTrips = trips.filter(element => {
        return element.userID === currentTraveler.id;
    })
    // console.log(currentTravelerTrips, 'current Traveler Trips')
    displayCurrentTraveler(currentTraveler, currentTravelerTrips)
    return currentTravelerTrips;
}