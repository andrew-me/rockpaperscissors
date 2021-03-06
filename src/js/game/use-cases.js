export {
  iterate,
  reset,
  getState,
  init,
  addPlayer,
  switchPlayer,
  addWeapons,
  play,
  checkIfWinner,
  getPlayerScore,
  getPlayerWeapon
};

function iterate(game) {
  validateGame(game);
  game.iteration++;
  return game;
}

function reset(game) {
  validateGame(game);
  game.target = 3;
  game.message = null;
  game.iteration = 0;
  game.players[0].score = 0;
  game.players[0].currentWeapon = null;
  game.players[1].score = 0;
  game.players[1].currentWeapon = null;
  return game;
}

function getState(game) {
  validateGame(game);
  if(game.iteration === 0) return 'start';
  if(checkIfWinner(game) !== null) return 'end';
  return 'playing';
}

function init(game, userId1, userId2, weapons) {
  validateGame(game);
  game = addPlayer(game, userId1);
  game = addPlayer(game, userId2);
  game = addWeapons(game, weapons);
  return game;
}

function addPlayer(game, id) {
  validateGame(game);
  game.players.push({id: id, score: 0, currentWeapon: null});
  return game;
}

function switchPlayer(game, oldUserId, newUserId) {
  validateGame(game);
  game.players.forEach((player) => {
    if(player.id === oldUserId) {
      player.id = newUserId;
    }
  });
  return game;
}

function addWeapons(game, weapons) {
  validateGame(game);
  validateWeapons(weapons);
  game.weapons = weapons;
  return game;
}

function play(game, player1Weapon, player2Weapon) {
  validateGame(game);
  if(checkIfWinner(game) !== null) return game;

  const winningWeapon = game.weapons.declareWinner(game.weapons.items, player1Weapon, player2Weapon);
  game.iteration++;
  game.message = winningWeapon.message;
  game.players[0].currentWeapon = player1Weapon;
  game.players[1].currentWeapon = player2Weapon;

  if(winningWeapon.id !== -1){
    game.players.forEach(
      function(player){
        if(player.currentWeapon === winningWeapon.id){
          player.score++;
          game.message = winningWeapon.message;
        }
      }
    );
  }
  return game;
}

function checkIfWinner(game){
  validateGame(game);

  if(game.players[0].score === game.target) return game.players[0].id;
  if(game.players[1].score === game.target) return game.players[1].id;

  return null;
}

function getPlayerScore(game, userId) {
  const player = game.players.filter(player => player.id === userId);
  return player[0].score;
}

function getPlayerWeapon(game, userId) {
  const player = game.players.filter(player => player.id === userId);
  return player[0].currentWeapon;
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
    !(typeof(weapons.getAllWeaponsData) === typeof(Function)) ||
    !(typeof(weapons.getRandomWeapon) === typeof(Function)) ||
    !(typeof(weapons.filterWeaponsById) === typeof(Function)) ||
    !(typeof(weapons.declareWinner) === typeof(Function)) ||
      ('items' in weapons) &&
      !(Array.isArray(weapons.items))) {
    throw new Error('invalid weapons object');
  }
}
