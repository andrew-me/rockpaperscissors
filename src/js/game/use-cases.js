export {
  iterate,
  reset
};

function iterate(game) {
  game.iteration++;
  return game;
}

function reset(game) {
  game.target = 5;
  game.iteration = 0;
  game.players[0].score = 0;
  game.players[1].score = 0;
  return game;
}


export const data = {
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
