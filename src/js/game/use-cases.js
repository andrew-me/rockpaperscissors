export {
  iterate,
  reset,
  getState,
  addPlayer,
  addWeapons
};

function iterate(game) {
  validateGame(game);
  game.iteration++;
  return game;
}

function reset(game) {
  validateGame(game);
  game.target = 5;
  game.iteration = 0;
  game.players[0].score = 0;
  game.players[1].score = 0;
  return game;
}

function getState(game) {
  validateGame(game);
  if(game.iteration === 0) return 'start';
  if(game.iteration === game.target) return 'end';
  return 'playing';
}

function addPlayer(game, id) {
  validateGame(game);
  game.players.push({id: id, score: 0});
  return game;
}

function addWeapons(game, weapons) {
  validateGame(game);
  validateWeapons(weapons);
  game.weapons = weapons;
  return game;
}

function validateGame(game) {
  if (!(game !== null && typeof game === 'object') ||
      (('id' in game) &&
      !(typeof game.id === 'number'))) {
    throw new Error('invalid game object');
  }
}

function validateWeapons(weapons) {
  if (!(weapons !== null && typeof weapons === 'object') ||
      !(typeof(weapons.getAllWeapons) === typeof(Function)) ||
      ('items' in weapons) &&
      !(Array.isArray(weapons.items))) {
    throw new Error('invalid weapons object');
  }
}
