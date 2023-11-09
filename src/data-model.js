//Imports Here: 
import { allTravelersData, allTrips } from "./scripts";
import { displayCurrentTraveler } from "./domUppdates";

//QuerySelectors Here: 
const login = document.querySelector('.login');
const loginWindow = document.querySelector('.login-window');
const travelInfo = document.querySelector('.travel-info');

//Variables Here:
const userNums = ['1', '2', '3', '4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50'];
let currentId 
let currentTraveler



//Functions Here
export const findCurrentId = () => {
    userNums.forEach(element => { 
    if (username.value.includes(element)) {
        currentId = element
        }
        userLogsIn();
        return currentId;
    })
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