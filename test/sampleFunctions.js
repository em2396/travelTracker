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