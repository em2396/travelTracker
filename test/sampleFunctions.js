import { sampleTravelers, sampleDestinations, sampleTrips } from './sampleData';

// export let allTravelersData = sampleTravelers;
// export let allTripsData = sampleTrips;
export let currentId;
export let username = 'traveler1';
export let password = 'travel';
export let wrongPassword = 'trovel';
export let wrongUsername = 'travveler1';
export let currentTraveler;
export let currentTravelerTrips;
export let upcoming =[];
export let past = [];
export let pending = [];
export let tripsThisYear;
export let destinationsThisYear;

export const findCurrentId = (username) => {
    let splitValues = username.split('traveler')
    currentId = splitValues[1];
    return currentId;
  };
  
export const userLogsIn = (currentId, username, password) => {
      if (username === `traveler${currentId}` && password === 'travel') {
         return sampleTravelers[0];
      } else {
          return 'Wrong username or password';
      }
  };

  export const findCurrentTraveler = allTravelers => {
   return currentTraveler = allTravelers.find(user => {
        return user.id == currentId;
    });
  };

  export const travelerTripData = (currentTraveler, trips) => {
    const currentTravelerTrips = trips.filter(element => {  
        return element.userID === currentTraveler.id;
    });
    if(currentTravelerTrips.length >= 1) {
        return currentTravelerTrips;
    } else {
        return "Couldn't find any trips"
    }
};

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
    });
};

export const findTripsThisYear = travelerTrips => {
   tripsThisYear = travelerTrips.reduce((acc, current) => {
        const tripYear = current.date.slice(0, 4);
        if (tripYear == 2020) {
            acc.push(current);
        }
        return acc;
    },[]);
    if (tripsThisYear.length === 0) {
        return 'No trips this year!'
    } else {
        return tripsThisYear;
    };
 };

 export const findDestinationsThisYear = (tripsThisYear, destinations) => {
    destinationsThisYear = tripsThisYear.reduce((acc, trip) => {
        const destination = destinations.find(dest => dest.id === trip.destinationID);
        if (destination) {
            acc.push(destination);
        };
        return acc;
    }, []);
    if(destinationsThisYear.length >= 1) {
        return destinationsThisYear;
    } else {
        return 'There are no trips that match'
    }
};

export const calculateCost = (destinations, tripYear) => {
    let total;
    tripYear.reduce((acc, current) => {
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
    return total
};

