/* eslint-env mocha */
/* global expect:false */

import { iterate, reset } from './use-cases';

describe('game', () => {

  it('should iterate', () => {
    const gameData = makeDummyGameData();
    const iteratedGameData = iterate(gameData);
    expect(iteratedGameData.iteration).to.equal(1);
	});

  it('should reset', () => {
    const origGameData = makeDummyGameData();
    const gameData = makeDummyGameData();
    gameData.target = 6;
    gameData.iteration = 3;
    gameData.players[0].score = 2;
    gameData.players[1].score = 0;
    const resetGameData = reset(gameData);
    expect(resetGameData).to.deep.equal(origGameData);
	});

  it('should indicate game state', () => {

	});

  it('should add a player', () => {

	});

  it('should add weapons', () => {

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
    players: [{
      id: null,
      score: 0
    }, {
      id: null,
      score: 0
    }],
    weapons: null
  };

	return game;
}
