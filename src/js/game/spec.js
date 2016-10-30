/* eslint-env mocha */
/* global expect:false */

import { iterate, reset, getState, addPlayer, addWeapons } from './use-cases';

describe('game', () => {

  it('should iterate', () => {
    const gameData = makeDummyGameData();
    const iteratedGameData = iterate(gameData);
    expect(iteratedGameData.iteration).to.equal(1);
	});

  it('should reset', () => {
    let origGameData = makeDummyGameData();
    origGameData = addPlayer(origGameData, 0);
    origGameData = addPlayer(origGameData, 1);

    let gameData = makeDummyGameData();
    gameData = addPlayer(gameData, 0);
    gameData = addPlayer(gameData, 1);
    gameData.target = origGameData.target + 1;
    gameData.iteration = origGameData.target - 2;
    gameData.players[0].score = 2;
    gameData.players[1].score = 0;

    const resetGameData = reset(gameData);
    expect(resetGameData).to.deep.equal(origGameData);
	});

  it('should indicate game state', () => {
    const gameDataStart = makeDummyGameData();
    const stateStart = getState(gameDataStart);
    expect(stateStart).to.equal('start');

    let gameDataPlaying = makeDummyGameData();
    gameDataPlaying.iteration = 1;
    const statePlaying = getState(gameDataPlaying);
    expect(statePlaying).to.equal('playing');

    let gameDataEnd = makeDummyGameData();
    gameDataEnd.iteration = gameDataEnd.target;
    const stateEnd = getState(gameDataEnd);
    expect(stateEnd).to.equal('end');
	});

  it('should add players', () => {
    let gameData = makeDummyGameData();

    gameData = addPlayer(gameData, 0);
    expect(gameData.players[0].id).to.equal(0);

    gameData = addPlayer(gameData, 1);
    expect(gameData.players[1].id).to.equal(1);
	});

  it('should add weapons', () => {
    const gameData = makeDummyGameData();
    const weapons = makeDummyWeapons();
    const withWeapons = addWeapons(gameData, weapons);
    expect(withWeapons.weapons.items[0].id === weapons.items[0].id);
    expect(withWeapons.weapons.items.length === weapons.items.length);
	});

  it('should play a turn', () => {

	});

  it('should indicate winning player', () => {

	});

});

function makeDummyGameData() {
  const game = {
    target: 5,
    iteration: 0,
    players: [],
    weapons: null
  };

	return game;
}

function makeDummyWeapons() {
  const weapons = {
    getAllWeapons: function(){},
    items: [{
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
    }]
  };

	return weapons;
}
