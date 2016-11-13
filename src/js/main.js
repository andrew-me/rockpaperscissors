require('../css/main.scss');

import { data as userData, getHumanUser, getBotUser, renderUser, filterUsersById, filterOutUsersById } from './users';
import { data as weaponsData, getWeapons, filterWeaponsById, renderWeapons, renderWeapon } from './weapons';
import { data as gameData, reset, getState, init, switchPlayer, getPlayerScore, play, checkIfWinner, renderAutoGoButton, renderResetButton, renderMessage } from './game';

const app = document.getElementById('app');

let user1 = getHumanUser(userData.users);
let user2 = getBotUser(userData.users);
const weapons = getWeapons(weaponsData.weapons);

let game = init(gameData, user1.id, user2.id, weapons);

const takeTurn = function(weapon1Id, weapon2Id) {
  game = play(game, weapon1Id, weapon2Id);
  showGameWinnerMessage(game);
  render();
}

const takeTurnWithRandomWeapons = function() {
  const randomWeapon = weapons.getRandomWeapon(weaponsData.weapons);
  const randomWeapon2 = weapons.getRandomWeapon(weaponsData.weapons);
  takeTurn(randomWeapon.id, randomWeapon2.id);
}

const showGameWinnerMessage = function(game) {
  const winnerId = checkIfWinner(game);
  if(winnerId !== null){
    const winner = filterUsersById(userData.users, winnerId);
    game.message = `Winner! ${winner.name}`;
  }
}

const weaponAction = function(weaponId){
  return function(){
    const randomWeapon = weapons.getRandomWeapon(weaponsData.weapons);
    takeTurn(weaponId, randomWeapon.id);
  }
}

const switchPlayerAction = function(game){
  return function(oldUserId, newUserId) {
    return function(){
      game = switchPlayer(game, oldUserId, newUserId);
      const newUser = filterUsersById(userData.users, newUserId);
      if(user1.id === oldUserId) {
        user1 = newUser;
      }
      else {
        user2 = newUser;
      }
      render();
    }
  }
}

const doReset = function() {
  reset(game);
  game.message = `First to ${game.target} games. Good luck!`;
  render();
}

const autoPlay = function() {
  takeTurnWithRandomWeapons();
  if(getState(game) !== 'end'){
    window.setTimeout(function(){
      autoPlay();
    }, 1000);
  }
}

const render = function(){
  const user1HTML = renderUser(
    user1,
    getPlayerScore(game, user1.id),
    getState(game) === 'start',
    filterOutUsersById(userData.users, [user1.id, user2.id]),
    switchPlayerAction(game)
  );
  const user2HTML = renderUser(user2, getPlayerScore(game, user2.id));
  const user1WeaponHTML = renderWeapon(filterWeaponsById(weapons.items, game.players[1].currentWeapon), null);
  const weaponsHTML = renderWeapons(weapons.items, weaponAction);

  app.innerHTML = '';

  app.appendChild(renderMessage(game.message));
  app.appendChild(user2HTML);
  if(user1WeaponHTML){
    app.appendChild(user1WeaponHTML);
  }
  app.appendChild(user1HTML);

  if(user1.type === 'human'){
    app.appendChild(weaponsHTML);

    if(getState(game) !== 'start'){
      app.appendChild(renderResetButton(doReset));
    }
  }
  else {
    const user2WeaponHTML = renderWeapon(filterWeaponsById(weapons.items, game.players[0].currentWeapon), null);
    if(user2WeaponHTML){
      app.appendChild(user2WeaponHTML);
    }
    if(getState(game) === 'start'){
      app.appendChild(renderAutoGoButton(autoPlay));
    }
    if(getState(game) === 'end'){
      app.appendChild(renderResetButton(doReset));
    }
  }
}

game.message = `First to ${game.target} games. Good luck!`;
render();
