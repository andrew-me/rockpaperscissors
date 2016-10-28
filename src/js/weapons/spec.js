/* eslint-env mocha */
/* global expect:false */

import { getAllWeapons } from './use-cases';

describe('weapons', () => {

  it('should return all weapons', () => {
    const weaponsData = makeDummyWeaponsData();
    const allWeapons = getAllWeapons(weaponsData);
    expect(allWeapons.length).to.equal(weaponsData.length);
    expect(allWeapons[0].id).to.equal(weaponsData[0].id);
	});

});

function makeDummyWeaponsData() {
  const weapons = [{
    id: 0,
    name: 'Paper',
    beats: [{
      id: 2,
      message: 'Paper wraps Stone'
    }]
  }, {
    id: 1,
    name: 'Scissors',
    beats: [{
      id: 0,
      message: 'Scissors cut Paper'
    }]
  }, {
    id: 2,
    name: 'Stone',
    beats: [{
      id: 1,
      message: 'Stone blunts Scissors'
    }]
  }];

	return weapons;
}
