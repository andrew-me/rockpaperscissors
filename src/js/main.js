require('../css/main.scss');

import { data as userData, getHumanUser, getBotUser, renderUser } from './users';
import { data as weaponsData, getWeapons, renderWeapons } from './weapons';
import { data as gameData, init, getPlayerScore, play } from './game';

const app = document.getElementById('app');

const humanUser = getHumanUser(userData.users);
const botUser = getBotUser(userData.users);
const weapons = getWeapons(weaponsData.weapons);

let game = init(gameData, botUser.id, humanUser.id, weapons);

const weaponAction = function(weaponId){
  return function(){
    const randomWeapon = weapons.getRandomWeapon(weaponsData.weapons);
    game = play(game, weaponId, randomWeapon.id);
    render();
  }
}

const render = function(){
  const humanUserHTML = renderUser(humanUser, getPlayerScore(game, humanUser.id));
  const botUserHTML = renderUser(botUser, getPlayerScore(game, botUser.id));
  const weaponsHTML = renderWeapons(weapons.items, weaponAction);

  app.innerHTML = `<div class="message">${game.message}</div>`;
  app.appendChild(botUserHTML);
  app.appendChild(humanUserHTML);
  app.appendChild(weaponsHTML);
}

render();
