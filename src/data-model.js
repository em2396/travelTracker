//Imports Here: 
import { allTravelersData, allTrips, allDestinations } from "./scripts";
import { displayFirst, displayTotalCost, dropdownDestinations, displayEstimatedCost, hideLoginWindow } from "./domUppdates";
import { sendNewTrip } from "./apiCalls";

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
export const findCurrentId = (username) => {
    let splitValues = username.split('traveler')
    currentId = splitValues[1]
    userLogsIn(currentId, username, password)
    return currentId;
};

const userLogsIn = (currentId) => {
    if (username.value === `traveler${currentId}` && password.value === 'travel') {
        hideLoginWindow();
       return  findCurrentTraveler(allTravelersData);
    } else {
        alert('Wrong username or password');
    }
};

const findCurrentTraveler = allTravelers => {
    currentTraveler = allTravelers.find(user => {
        return user.id == currentId;
    })
    travelerTripData(currentTraveler, allTrips);
    return currentTraveler;
};

const travelerTripData = (currentTraveler, trips) => {
    currentTravelerTrips = trips.filter(element => {
        return element.userID === currentTraveler.id;
    });
    filterTripByDate(currentTravelerTrips);
    return currentTravelerTrips;
};

const filterTripByDate = travelerTrips => {
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

const findTripsThisYear = travelerTrips => {
    tripsThisYear = travelerTrips.reduce((acc, current) => {
        const tripYear = current.date.slice(0, 4);
        if (tripYear == 2020) {
            acc.push(current);
        }
        return acc;
    },[]);
    findDestinationsThisYear(tripsThisYear, allDestinations);
};
    
const findDestinationsThisYear = (tripsThisYear, destinations) => {
    destinationsThisYear = tripsThisYear.reduce((acc, trip) => {
        const destination = destinations.find(dest => dest.id === trip.destinationID);
        if (destination) {
            acc.push(destination);
        }
        return acc;
    }, [])
    calculateCost(destinationsThisYear);
};

const calculateCost = destinations => {
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

const estimateNewTripCost = tripInfo => {
    let total;
    const destCost = allDestinations.find(element => {
        return element.id === tripInfo.destinationID
    });
    total = ((tripInfo.travelers * destCost.estimatedFlightCostPerPerson) + (destCost.estimatedLodgingCostPerDay * tripInfo.duration));
    total += (total * .1);
    displayEstimatedCost(total);
    console.log(total);
};

