// import chai from 'chai';
// const expect = chai.expect;
// const { expect } = require('chai');


import { expect } from 'chai';
import { findCurrentId, currentId } from '../src/data-model';
import userSample from './sampleData';
console.log(userSample)

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe('Find current ID', function() {
  let currentTraveler;

  beforeEach(() => {
    currentTraveler = {
      id: 1,
      name: 'Rachel Vaughten',
      travelerType: 'thrill-seeker'
    }
  });

  it('should find the userID number', () => {
    let username = 'traveler1';
    const current = findCurrentId(username);

    expect(current).to.equal('1');
  })

})
