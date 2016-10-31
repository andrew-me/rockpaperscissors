/* eslint-env mocha */
/* global expect:false */

import { iterate, reset, getState, addPlayer, addWeapons, play, checkIfWinner, getPlayerScore } from './use-cases';

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
    let gameData = makeDummyGameData();
    const weapons = makeDummyWeapons();
    gameData = addWeapons(gameData, weapons);
    gameData = addPlayer(gameData, 0);
    gameData = addPlayer(gameData, 1);

    const playedGameData = play(gameData, 0, 2);

    expect(playedGameData.iteration).to.equal(1);
    expect(playedGameData.message).to.equal(weapons.items[0].beats[0].message);
    expect(playedGameData.players[0].score).to.equal(1);
    expect(playedGameData.players[1].score).to.equal(0);
	});

  it('should indicate winning player', () => {
    let gameData = makeDummyGameData();
    gameData = addPlayer(gameData, 0);
    gameData = addPlayer(gameData, 1);
    gameData.iteration = gameData.target;
    gameData.players[0].score = 4;
    gameData.players[1].score = 1;

    const winner = checkIfWinner(gameData);
    expect(winner).to.equal(0);
	});

  it('should get a players score', () => {
    let gameData = makeDummyGameData();
    gameData = addPlayer(gameData, 0);
    gameData = addPlayer(gameData, 1);
    gameData.players[0].id = 0;
    gameData.players[0].score = 4;

    const score = getPlayerScore(gameData, 0);
    expect(score).to.equal(gameData.players[0].score);
	});

});

function makeDummyGameData() {
  const game = {
    target: 5,
    iteration: 0,
    players: [],
    weapons: null,
    message: null
  };

	return game;
}

function makeDummyWeapons() {
  const weapons = {
    getAllWeaponsData: function(){},
    getRandomWeapon: function(){},
    filterWeaponsById: function(){},
    declareWinner: function(){
      return {
        id: 0,
        message: 'Paper wraps Stone'
      }
    },
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
