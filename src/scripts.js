import { allDestinations, allTravelers, allTrips, fetchTravelerInfo } from './apiCalls';
import './css/styles.css';

const allTravelersData = fetchTravelerInfo(allTravelers);
// const currentTraveler;
const allTripsData = fetchTravelerInfo(allTrips);
const allDestinationsData = fetchTravelerInfo(allDestinations);

console.log(allTripsData, 'all trips data')
console.log(allTravelersData, 'all travelers data');
console.log(allDestinationsData, 'destinations data');


//Create queryselectors for username and password inputs. When the submit button is clicked, the page will open for them to see their data
//
//trips data is an array of objects: { id: 1, userID: 44, destinationID: 49, travelers: 1, date: '2022/09/16'}
//traveler data is an array of 50 traveler objects: { id: 1, name: 'Hame Leadbeater', travelerType: 'relaxer'} 
//destination data: {id: 1, destination: 'Lima, Peru', estimatedLodgingCostPerDay: 70, estimatedFlightCostPerPerson: 400, image: 'url'}

// const getCurrentTraveler = 