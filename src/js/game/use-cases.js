export {
  iterate,
  reset,
  getState,
  init,
  addPlayer,
  addWeapons,
  play,
  checkIfWinner,
  getPlayerScore
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

function init(game, userId1, userId2, weapons) {
  validateGame(game);
  game = addPlayer(game, userId1);
  game = addPlayer(game, userId2);
  game = addWeapons(game, weapons);
  return game;
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

function play(game, player1Weapon, player2Weapon) {
  validateGame(game);
  const winner = game.weapons.declareWinner(game.weapons, player1Weapon, player2Weapon);
  game.iteration++;
  game.players.forEach(
    function(item){
      if(item.id === winner.id){
        item.score++;
        game.message = winner.message;
      }
    }
  );
  return game;
}

function checkIfWinner(game){
  validateGame(game);
  const player1Score = game.players[0].score;
  const player2Score = game.players[1].score;
  let winner = -1;

  if(player1Score + player2Score === game.target){
    winner = (player1Score > player2Score) ? game.players[0].id : game.players[1].id;
  }

  return winner;
}

function getPlayerScore(game, userId) {
  const player = game.players.filter(player => player.id === userId);
  return player[0].score;
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
