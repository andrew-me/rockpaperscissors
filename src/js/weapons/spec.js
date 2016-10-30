/* eslint-env mocha */
/* global expect:false */

import { getWeapons, getAllWeaponsData, getRandomWeapon, filterWeaponsById, declareWinner } from './use-cases';

describe('weapons', () => {

  it('should return a weapons object', () => {
    const weaponsData = makeDummyWeaponsData();
    const weapons = getWeapons(weaponsData);
    expect(typeof(weapons.getAllWeaponsData)).to.equal(typeof(Function));
    expect(weapons.items[0].id === weaponsData[0].id);
	});

  it('should return all weapons data', () => {
    const weaponsData = makeDummyWeaponsData();
    const allWeapons = getAllWeaponsData(weaponsData);
    expect(allWeapons.length).to.equal(weaponsData.length);
    expect(allWeapons[0].id).to.equal(weaponsData[0].id);
	});

  it('should return random weapon', () => {
    const weaponsData = makeDummyWeaponsData();
    const weapon = getRandomWeapon(weaponsData);
    expect(weapon.id).to.be.gte(0);
	});

  it('should filter weapons by id', () => {
    const weaponsData = makeDummyWeaponsData();
    const weapon = filterWeaponsById(weaponsData, weaponsData[0].id);
    expect(weapon.id).to.equal(weaponsData[0].id);
	});

  it('should declare winning weapon', () => {
    const weaponsData = makeDummyWeaponsData();
    const winner1 = declareWinner(weaponsData, 0, 1);
    const winner2 = declareWinner(weaponsData, 1, 2);
    const winner3 = declareWinner(weaponsData, 2, 0);
    const draw = declareWinner(weaponsData, 0, 0);

    expect(winner1.id).to.equal(1);
    expect(winner1.message).to.equal('Scissors cut Paper');

    expect(winner2.id).to.equal(2);
    expect(winner2.message).to.equal('Stone blunts Scissors');

    expect(winner3.id).to.equal(0);
    expect(winner3.message).to.equal('Paper wraps Stone');

    expect(draw.id).to.equal(-1);
    expect(draw.message).to.equal('Draw');
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
