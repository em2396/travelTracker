//Imports Here: 
import { allTravelersData, allTrips, allDestinations } from "./scripts";
import { displayFirst, displayTotalCost, dropdownDestinations, displayEstimatedCost } from "./domUppdates";
import { sendNewTrip } from "./apiCalls";

//QuerySelectors Here: 
const login = document.querySelector('.login');
const loginWindow = document.querySelector('.login-window');
const travelInfo = document.querySelector('.travel-info');

//Variables Here:
export let currentTraveler;
export let upcoming = [];
export let past = [];
export let pending = [];
export let tripsThisYear;
export let destinationsThisYear;
let currentId;
let currentTravelerTrips;

//Functions Here:
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
//^^^^^Refactor to move DOM updates

const findCurrentTraveler = allTravelers => {
    currentTraveler = allTravelers.find(user => {
        return user.id == currentId;
    })
    travelerTripData(currentTraveler, allTrips);
    return currentTraveler;
};

export const travelerTripData = (currentTraveler, trips) => {
    currentTravelerTrips = trips.filter(element => {
        return element.userID === currentTraveler.id;
    })
    console.log(currentTravelerTrips, 'updated')
    filterTripByDate(currentTravelerTrips);
    return currentTravelerTrips;
}

export const filterTripByDate = travelerTrips => {
    const todaysDate = new Date();
    travelerTrips.forEach(element => {
        const tripDate = new Date(element.date);
        if (todaysDate < tripDate && element.status === 'approved') {
            upcoming.push(element);
        } else if (todaysDate > tripDate && element.status === 'approved') { 
            past.push(element); 
        } else {
            pending.push(element)
        }
    })
    findTripsThisYear(currentTravelerTrips);
};

export const findTripsThisYear = travelerTrips => {
    tripsThisYear = travelerTrips.reduce((acc, current) => {
        const tripYear = current.date.slice(0, 4);
        if (tripYear == 2020) {
            acc.push(current);
        }
        return acc;
    },[]);
    findDestinationsThisYear(tripsThisYear, allDestinations);
};
    
export const findDestinationsThisYear = (tripsThisYear, destinations) => {
    destinationsThisYear = tripsThisYear.reduce((acc, trip) => {
        const destination = destinations.find(dest => dest.id === trip.destinationID);
        if (destination) {
            acc.push(destination);
        }
        return acc;
    }, [])
    calculateCost(destinationsThisYear);
};

export const calculateCost = destinations => {
    let total;
    tripsThisYear.reduce((acc, current) => {
        destinations.find(element => {
           const calculate = element.id === current.destinationID
            if (calculate) {
                acc += ((current.travelers * element.estimatedFlightCostPerPerson) + (element.estimatedLodgingCostPerDay * current.duration))
            } 
        })
        total = acc;
        return acc;
    }, 1)
    total += (total * .1);
    console.log(total);
    displayFirst(past, upcoming, pending); 
    displayTotalCost(total);
    dropdownDestinations(allDestinations);
    return total
};

export const newTrip = (button) => {
    console.log(allTrips, 'all trips');
    const destInput = allDestinations.find(element => {
       return element.destination === chooseDestination.value;
    });
    const destID = destInput.id;
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    const duration = parseInt(durationInput.value);
    const numOfPeople = parseInt(numOfTravelers.value);
    if (dateRegex.test(dateInput.value) && durationInput.value <= 30 && typeof numOfPeople === 'number') {
        const trip = {
            date: dateInput.value,
            destinationID: destID,
            duration: duration,
            id: allTrips.length + 1,
            status: 'pending',
            suggestedActivities: [],
            travelers: numOfPeople,
            userID: currentTraveler.id
        }
        if (button === 'submit') {
            sendNewTrip(trip);
        } else if (button === 'estimate') {
            estimateNewTripCost(trip);
        }
        return trip;
    };
};

export const estimateNewTripCost = tripInfo => {
    let total;
    const destCost = allDestinations.find(element => {
        return element.id === tripInfo.destinationID
    });
    total = ((tripInfo.travelers * destCost.estimatedFlightCostPerPerson) + (destCost.estimatedLodgingCostPerDay * tripInfo.duration));
    total += (total * .1);
    displayEstimatedCost(total);
    console.log(total);
};

// {date: '2023/07/16', destinationID: 8, duration: 5, id: 211, status: 'pending', …}
// date: "2023/07/16"
// destinationID: 8
// duration: 5
// id: 211
// status: "pending"
// suggestedActivities: []
// travelers: 2
// userID: 2
 
// {id: 8, destination: 'Tokyo, Japan', estimatedLodgingCostPerDay: 125, estimatedFlightCostPerPerson: 1000, image: 'https://images.unsplash.com/photo-1540959733332-ea…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80', …}
// estimatedFlightCostPerPerson: 1000
// estimatedLodgingCostPerDay: 125
// id: 8