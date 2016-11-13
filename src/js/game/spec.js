/* eslint-env mocha */
/* global expect:false */

import { iterate, reset, getState, addPlayer, switchPlayer, addWeapons, play, checkIfWinner, getPlayerScore } from './use-cases';

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
    gameData.players[0].currentWeapon = null;
    gameData.players[1].score = 0;
    gameData.players[1].currentWeapon = null;

    const resetGameData = reset(gameData);
    expect(resetGameData).to.deep.equal(origGameData);
	});

  it('should indicate game state', () => {
    const gameDataStart = makeDummyGameData();
    const stateStart = getState(gameDataStart);
    expect(stateStart).to.equal('start');

    let gameDataPlaying = makeDummyGameData();
    gameDataPlaying = addPlayer(gameDataPlaying, 0);
    gameDataPlaying = addPlayer(gameDataPlaying, 1);
    gameDataPlaying.iteration = 1;
    const statePlaying = getState(gameDataPlaying);
    expect(statePlaying).to.equal('playing');

    let gameDataPlaying2 = makeDummyGameData();
    gameDataPlaying2 = addPlayer(gameDataPlaying2, 0);
    gameDataPlaying2 = addPlayer(gameDataPlaying2, 1);
    gameDataPlaying2.players[0].score = gameDataPlaying2.target - 1;
    gameDataPlaying2.players[1].score = gameDataPlaying2.target - 1;
    gameDataPlaying2.iteration = gameDataPlaying2.target + 3;
    const statePlaying2 = getState(gameDataPlaying2);
    expect(statePlaying2).to.equal('playing');

    let gameDataEnd = makeDummyGameData();
    gameDataEnd = addPlayer(gameDataEnd, 0);
    gameDataEnd = addPlayer(gameDataEnd, 1);
    gameDataEnd.players[0].score = 2;
    gameDataEnd.players[1].score = 3;
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

  it('should switch player', () => {
    let gameData = makeDummyGameData();
    gameData = addPlayer(gameData, 0);
    gameData = addPlayer(gameData, 1);
    const switchedGameData = switchPlayer(gameData, 0, 2);
    expect(switchedGameData.players[0].id).to.equal(2);
	});

  it('should add weapons', () => {
    const gameData = makeDummyGameData();
    const weapons = makeDummyWeapons();
    const withWeapons = addWeapons(gameData, weapons);
    expect(withWeapons.weapons.items[0].id === weapons.items[0].id);
    expect(withWeapons.weapons.items.length === weapons.items.length);
	});

  it('should play some turns', () => {
    let gameData = makeDummyGameData();
    const weapons = makeDummyWeapons();
    gameData = addWeapons(gameData, weapons);
    gameData = addPlayer(gameData, 0);
    gameData = addPlayer(gameData, 1);

    let playedGameData = play(gameData, 0, 2);

    expect(playedGameData.iteration).to.equal(1);
    expect(playedGameData.message).to.equal(weapons.items[0].beats[0].message);
    expect(playedGameData.players[0].score).to.equal(1);
    expect(playedGameData.players[0].currentWeapon).to.equal(0);
    expect(playedGameData.players[1].score).to.equal(0);
    expect(playedGameData.players[1].currentWeapon).to.equal(2);

    playedGameData = play(gameData, 2, 0);

    expect(playedGameData.iteration).to.equal(2);
    expect(playedGameData.message).to.equal(weapons.items[0].beats[0].message);
    expect(playedGameData.players[0].score).to.equal(1);
    expect(playedGameData.players[0].currentWeapon).to.equal(2);
    expect(playedGameData.players[1].score).to.equal(1);
    expect(playedGameData.players[1].currentWeapon).to.equal(0);
	});

  it('should not play a turn if already a winner', () => {
    let gameData = makeDummyGameData();
    const weapons = makeDummyWeapons();
    gameData = addWeapons(gameData, weapons);
    gameData = addPlayer(gameData, 0);
    gameData = addPlayer(gameData, 1);
    gameData.iteration = gameData.target;
    gameData.players[0].id = 0;
    gameData.players[0].score = gameData.target;

    play(gameData, 2, 0);

    expect(gameData.iteration).to.equal(gameData.target);
    expect(gameData.players[0].score).to.equal(gameData.target);
	});

  it('should indicate winning player if target is met', () => {
    let gameData = makeDummyGameData();
    gameData = addPlayer(gameData, 0);
    gameData = addPlayer(gameData, 1);
    gameData.iteration = gameData.target;
    gameData.players[0].score = 3;
    gameData.players[1].score = 1;

    const winner = checkIfWinner(gameData);
    expect(winner).to.equal(0);
	});

  it('should not indicate a winner if scores are equal', () => {
    let gameData = makeDummyGameData();
    gameData = addPlayer(gameData, 0);
    gameData = addPlayer(gameData, 1);
    gameData.iteration = gameData.target;
    gameData.players[0].score = 1;
    gameData.players[1].score = 1;

    const winner = checkIfWinner(gameData);
    expect(winner).to.equal(null);
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
    target: 3,
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
