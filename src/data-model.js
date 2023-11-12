//Imports Here: 
import { allTravelersData, allTrips, allDestinations } from "./scripts";
import { displayFirst, displayTotalCost, dropdownDestinations } from "./domUppdates";

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

const findCurrentTraveler = allTravelers => {
    // console.log(allDestinations)
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
    filterTripByDate(currentTravelerTrips);
    return currentTravelerTrips;
}

export const filterTripByDate = travelerTrips => {
    const todaysDate = new Date();
    travelerTrips.forEach(element => {
        const tripDate = new Date(element.date);
        if (todaysDate < tripDate && element.status === 'approved') {
            upcoming.push(element);
        } else if (todaysDate > tripDate && element.status === 'approved'){ 
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
    let total
    console.log(tripsThisYear)
    console.log(destinations, 'dest');
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
    displayFirst(past, upcoming, pending); //change to upcoming when use POST
    displayTotalCost(total);
    dropdownDestinations(allDestinations);
    return total
};

export const estimateNewTripCost = () => {
    
}

    //allDestinations looks like :  [... {id: 1, destination: 'Lima, Peru', estimatedLodgingCostPerDay: 70, estimatedFlightCostPerPerson: 400, image: link }... ]
