require('../css/main.scss');

import { data as userData, getHumanUser, getBotUser, renderUser, filterUsersById, filterOutUsersById } from './users';
import { data as weaponsData, getWeapons, filterWeaponsById, renderWeapons, renderWeapon } from './weapons';
import { data as gameData, reset, getState, init, switchPlayer, getPlayerScore, getPlayerWeapon, play, checkIfWinner, renderAutoGoButton, renderResetButton, renderMessage } from './game';

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

const renderUserWithWeapons = function(userToRender, otherUser, allowUserChange = false){
  let userHTML;
  const score = getPlayerScore(game, userToRender.id);

  if(allowUserChange){
    userHTML = renderUser(
      userToRender,
      score,
      getState(game) === 'start',
      filterOutUsersById(userData.users, [userToRender.id, otherUser.id]),
      switchPlayerAction(game)
    );
  }
  else {
    userHTML = renderUser(userToRender, score);
  }

  const div = document.createElement('div');
  div.appendChild(userHTML);

  if(userToRender.type === 'human'){
    div.appendChild(renderWeapons(weapons.items, weaponAction));
  }
  else {
    const userCurrentWeaponHTML = renderWeapon(filterWeaponsById(weapons.items, getPlayerWeapon(game, userToRender.id)), null);
    if(userCurrentWeaponHTML){
      div.appendChild(userCurrentWeaponHTML);
    }
  }

  return div;
}

const renderButtons = function(hasHuman){
  const div = document.createElement('div');
  if(hasHuman){
    if(getState(game) !== 'start'){
      div.appendChild(renderResetButton(doReset));
    }
  }
  else { // Both players are bots.
    if(getState(game) === 'start'){
      div.appendChild(renderAutoGoButton(autoPlay));
    }
    if(getState(game) === 'end'){
      div.appendChild(renderResetButton(doReset));
    }
  }

  return div;
}

const render = function(){
  app.innerHTML = '';

  app.appendChild(renderMessage(game.message));
  app.appendChild(renderUserWithWeapons(user2, user1, false));
  app.appendChild(renderUserWithWeapons(user1, user2, true));
  app.appendChild(renderButtons(user1.type === 'human' || user2.type === 'human'));
}

game.message = `First to ${game.target} games. Good luck!`;
render();
