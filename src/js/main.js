require('../css/main.scss');

import { data as userData, getHumanUser, getBotUser, renderUser, filterUsersById } from './users';
import { data as weaponsData, getWeapons, filterWeaponsById, renderWeapons, renderWeapon } from './weapons';
import { data as gameData, init, getPlayerScore, play, checkIfWinner } from './game';

const app = document.getElementById('app');

const humanUser = getHumanUser(userData.users);
const botUser = getBotUser(userData.users);
const weapons = getWeapons(weaponsData.weapons);

let game = init(gameData, humanUser.id, botUser.id, weapons);

const weaponAction = function(weaponId){
  return function(){
    const randomWeapon = weapons.getRandomWeapon(weaponsData.weapons);
    game = play(game, weaponId, randomWeapon.id);
    const winnerId = checkIfWinner(game);
    if(winnerId){
      const winner = filterUsersById(userData.users, winnerId);
      game.message += ` Winner! ${winner.name}`;
    }
    render();
  }
}

const render = function(){
  const humanUserHTML = renderUser(humanUser, getPlayerScore(game, humanUser.id));
  const botUserHTML = renderUser(botUser, getPlayerScore(game, botUser.id));
  const botWeaponHTML = renderWeapon(filterWeaponsById(weapons.items, game.players[1].currentWeapon), null);
  const weaponsHTML = renderWeapons(weapons.items, weaponAction);

  if(game.message){
    app.innerHTML = `<div class="message">${game.message}</div>`;
  }

  app.appendChild(botUserHTML);
  if(botWeaponHTML){
    app.appendChild(botWeaponHTML);
  }
  app.appendChild(humanUserHTML);
  app.appendChild(weaponsHTML);
}

game.message = `Best of ${game.target} games. Good luck!`;
render();
