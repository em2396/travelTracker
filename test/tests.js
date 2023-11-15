import { expect } from 'chai';
import { sampleTravelers, sampleDestinations, sampleTrips } from './sampleData';
import { findCurrentId, userLogsIn, currentId, username, password, wrongPassword, wrongUsername, findCurrentTraveler, travelerTripData, filterTripByDate, upcoming, past, pending, findTripsThisYear, tripsThisYear, findDestinationsThisYear, calculateCost } from './sampleFunctions';
// console.log(userSample)

describe('Find current ID', function() {
  it('should find the userID number', () => {
    let current = findCurrentId(username);

    expect(current).to.equal('1');
  });
});

describe('User logs in', function() {
    it('should login to page and find current traveler', () => {
        let correctLogin = userLogsIn(currentId, username, password);

        expect(correctLogin).to.equal(sampleTravelers[0]);
    });

    it('should alert on the page if username is incorrect', () => {
        let incorrectUsername = userLogsIn(currentId, wrongUsername, password);

        expect(incorrectUsername).to.equal('Wrong username or password');
    });

    it('should alert on the page is password is incorrect', () => {
        let incorrectPassword = userLogsIn(currentId, username, wrongPassword);

        expect(incorrectPassword).to.equal('Wrong username or password');
    });
});

describe('Find current traveler object from all traveler data', function() {
    it('should return user object associated with currentId number', () => {
        let sampleTraveler = findCurrentTraveler(sampleTravelers);

        expect(sampleTraveler).to.equal(sampleTravelers[0]);
    });
});

describe('Find all trips related to current traveler', function() {
    let result = [
        {
          date: '2022/09/09',
          destinationID: 1,
          duration: 8,
          id: 1,
          status: 'approved',
          suggestedActivities: [],
          travelers: 1,
          userID: 1
        },
        {
          date: '2023/11/11',
          destinationID: 1,
          duration: 10,
          id: 3,
          status: 'pending',
          suggestedActivities: [],
          travelers: 1,
          userID: 1
        },
        {
          date: '2021/06/16',
          destinationID: 5,
          duration: 8,
          id: 5,
          status: 'approved',
          suggestedActivities: [],
          travelers: 2,
          userID: 1
        }
      ];

      it('should return an array of objects that match traveler', () => {
        let current = { id: 1, name: 'Rachel Vaughten', travelerType: 'thrill-seeker' }
        let sampleTravelerTrips = travelerTripData(current, sampleTrips);

          expect(sampleTravelerTrips).to.deep.equal(result);
      });
      it('should return not found if id does not match any current trips', () => {
        let current = { id: 56, name: 'Rachel Vaughten', travelerType: 'thrill-seeker' }
        let notFound = travelerTripData(current, sampleTrips);
          
          expect(notFound).to.equal("Couldn't find any trips");
      });
});

describe('Filter current travelers trip by date', function() {
    it('upcoming should be an empty array', () => {
        let currentTrips = [
            {
              date: '2022/09/09',
              destinationID: 1,
              duration: 8,
              id: 1,
              status: 'approved',
              suggestedActivities: [],
              travelers: 1,
              userID: 1
            },
            {
              date: '2023/11/11',
              destinationID: 1,
              duration: 10,
              id: 3,
              status: 'pending',
              suggestedActivities: [],
              travelers: 1,
              userID: 1
            },
            {
              date: '2021/06/16',
              destinationID: 5,
              duration: 8,
              id: 5,
              status: 'approved',
              suggestedActivities: [],
              travelers: 2,
              userID: 1
            }
          ]; 
    
        let pushValues = filterTripByDate(currentTrips);
        
        expect(upcoming).to.deep.equal([]);
    });
    it('past should be an array of 2 objects', () => {
        let currentTrips = [
            {
              date: '2022/09/09',
              destinationID: 1,
              duration: 8,
              id: 1,
              status: 'approved',
              suggestedActivities: [],
              travelers: 1,
              userID: 1
            },
            {
              date: '2023/11/11',
              destinationID: 1,
              duration: 10,
              id: 3,
              status: 'pending',
              suggestedActivities: [],
              travelers: 1,
              userID: 1
            },
            {
              date: '2021/06/16',
              destinationID: 5,
              duration: 8,
              id: 5,
              status: 'approved',
              suggestedActivities: [],
              travelers: 2,
              userID: 1
            }
          ]; 
        let samplePast = [{
            date: '2022/09/09',
            destinationID: 1,
            duration: 8,
            id: 1,
            status: 'approved',
            suggestedActivities: [],
            travelers: 1,
            userID: 1
          },             {
            date: '2021/06/16',
            destinationID: 5,
            duration: 8,
            id: 5,
            status: 'approved',
            suggestedActivities: [],
            travelers: 2,
            userID: 1
          }];

        expect(past).to.deep.equal(samplePast);
    });
    it('pending  should be an array with one object', () => {
        let samplePending = [{
            date: '2023/11/11',
            destinationID: 1,
            duration: 10,
            id: 3,
            status: 'pending',
            suggestedActivities: [],
            travelers: 1,
            userID: 1
          }];

        expect(pending).to.deep.equal(samplePending);
    });  
});

describe('Find trips for current year (2020)', function() {
  it('travelerTrips should be an array of objects of trips in 2020', () => {
    let tripsWith2020 = [
      {
        date: '2020/09/09',
        destinationID: 1,
        duration: 8,
        id: 1,
        status: 'approved',
        suggestedActivities: [],
        travelers: 1,
        userID: 1
      },
      {
        date: '2021/06/16',
        destinationID: 5,
        duration: 8,
        id: 5,
        status: 'approved',
        suggestedActivities: [],
        travelers: 2,
        userID: 1
      }
    ];
  let resultWith2020 = [{
    date: '2020/09/09',
    destinationID: 1,
    duration: 8,
    id: 1,
    status: 'approved',
    suggestedActivities: [],
    travelers: 1,
    userID: 1
  }];
  let allCurrentTrips = findTripsThisYear(tripsWith2020);

   expect(allCurrentTrips).to.deep.equal(resultWith2020)
  });

  it('should return a string of no trips if traveler did not take any trips', () => {
    let tripsWithout2020 = [
      {
        date: '2022/09/09',
        destinationID: 1,
        duration: 8,
        id: 1,
        status: 'approved',
        suggestedActivities: [],
        travelers: 1,
        userID: 1
      },
      {
        date: '2021/06/16',
        destinationID: 5,
        duration: 8,
        id: 5,
        status: 'approved',
        suggestedActivities: [],
        travelers: 2,
        userID: 1
      }
    ];
    let tripsWithout = findTripsThisYear(tripsWithout2020);

    expect(tripsWithout).to.equal('No trips this year!');
  });
});

describe('Find destinations for the year 2020', function() {
  it('should create an array of objects of destinations', () => {
    let trip1 = [{
        date: '2020/09/09',
        destinationID: 1,
        duration: 8,
        id: 1,
        status: 'approved',
        suggestedActivities: [],
        travelers: 1,
        userID: 1
      }
    ];
    let dest = findDestinationsThisYear(trip1, sampleDestinations)
    let outputDestination = [sampleDestinations[0]];

    expect(dest).to.deep.equal(outputDestination);
  });
  it('should not find any ids that match', () => {
    let trip2 = [ 
      {
        date: '2020/09/09',
        destinationID: 88,
        duration: 8,
        id: 1,
        status: 'approved',
        suggestedActivities: [],
        travelers: 1,
        userID: 1
       }
    ]
    let dest2 = findDestinationsThisYear(trip2, sampleDestinations);

    expect(dest2).to.equal('There are no trips that match')
  });
});

describe('Calculcate cost for the year 2020', () => {
  it('should return a number that calculates how much the trips were in 2020', () => {
    
    let tripsYear = [
      {
        date: '2020/09/09',
        destinationID: 1,
        duration: 8,
        id: 1,
        status: 'approved',
        suggestedActivities: [],
        travelers: 1,
        userID: 1
      }
    ];
    let destinationsToAdd = [sampleDestinations[0]]
    let totalSample = calculateCost(destinationsToAdd, tripsYear);

    expect(totalSample).to.equal(1739.1)
  });
});
