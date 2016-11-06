require('../css/main.scss');

import { data as userData, getHumanUser, getBotUser, filterUsersByType, renderUser, filterUsersById, filterOutUsersById } from './users';
import { data as weaponsData, getWeapons, filterWeaponsById, renderWeapons, renderWeapon } from './weapons';
import { data as gameData, reset, init, getPlayerScore, play, checkIfWinner } from './game';

const app = document.getElementById('app');

const user1 = getHumanUser(userData.users);
const user2 = getBotUser(userData.users);
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

const doReset = function() {
  reset(game);
  render();
}

const render = function(){
  const user1HTML = renderUser(user1, getPlayerScore(game, user1.id), filterUsersByType(filterOutUsersById(userData.users, [user1.id, user2.id]), 'user1'));
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
  app.appendChild(weaponsHTML);


  const div = document.createElement('div');
  div.className = 'reset';
  div.innerHTML = 'Reset';
  div.onclick = doReset;
  app.appendChild(div);
}

game.message = `Best of ${game.target} games. Good luck!`;
render();
