require('../css/main.scss');

import { data as userData, getHumanUser, getBotUser, renderUser, filterUsersById, filterOutUsersById } from './users';
import { data as weaponsData, getWeapons, filterWeaponsById, renderWeapons, renderWeapon } from './weapons';
import { data as gameData, reset, getState, init, switchPlayer, getPlayerScore, play, checkIfWinner } from './game';

const app = document.getElementById('app');

let user1 = getHumanUser(userData.users);
let user2 = getBotUser(userData.users);
const weapons = getWeapons(weaponsData.weapons);

let game = init(gameData, user1.id, user2.id, weapons);
const weaponAction = function(weaponId){
  return function(){
    const randomWeapon = weapons.getRandomWeapon(weaponsData.weapons);
    game = play(game, weaponId, randomWeapon.id);
    const winnerId = checkIfWinner(game);
    if(winnerId !== null){
      const winner = filterUsersById(userData.users, winnerId);
      game.message = `Winner! ${winner.name}`;
    }
    render();
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
  render();
}

const doAutoPlay = function() {
  const randomWeapon = weapons.getRandomWeapon(weaponsData.weapons);
  const randomWeapon2 = weapons.getRandomWeapon(weaponsData.weapons);
  game = play(game, randomWeapon.id, randomWeapon2.id);
  const winnerId = checkIfWinner(game);
  if(winnerId !== null){
    const winner = filterUsersById(userData.users, winnerId);
    game.message = `Winner! ${winner.name}`;
  }
  render();
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

  if(game.message){
    app.innerHTML = `<div class="message">${game.message}</div>`;
  }

  app.appendChild(user2HTML);
  if(user1WeaponHTML){
    app.appendChild(user1WeaponHTML);
  }
  app.appendChild(user1HTML);
  if(user1.type === 'human'){
    app.appendChild(weaponsHTML);
  }
  else {
    const user2WeaponHTML = renderWeapon(filterWeaponsById(weapons.items, game.players[0].currentWeapon), null);
    if(user2WeaponHTML){
      app.appendChild(user2WeaponHTML);
    }
    if(getState(game) === 'start'){
      const autoButton = document.createElement('button');
      autoButton.innerHTML = 'Go!';
      autoButton.onclick = doAutoPlay;
      app.appendChild(autoButton);
    }
  }

  const div = document.createElement('div');
  div.className = 'reset';
  div.innerHTML = 'Reset';
  div.onclick = doReset;
  app.appendChild(div);
}

game.message = `Best of ${game.target} games. Good luck!`;
render();
