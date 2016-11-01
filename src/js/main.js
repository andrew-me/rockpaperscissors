require('../css/main.scss');

import { data as userData, getHumanUser, getBotUser, renderUser } from './users';
import { data as weaponsData, getWeapons, renderWeapons } from './weapons';
import { data as gameData, init, getPlayerScore, play } from './game';

const humanUser = getHumanUser(userData.users);
const botUser = getBotUser(userData.users);
const weapons = getWeapons(weaponsData.weapons);

let game = init(gameData, botUser.id, humanUser.id, weapons);

const weaponAction = function(weaponId){
  return function(){
    const randomWeapon = weapons.getRandomWeapon(weaponsData.weapons);
    game = play(game, weaponId, randomWeapon.id);
    console.log(game);
  }
}


console.log(game);

console.log(renderUser(humanUser, getPlayerScore(game, humanUser.id)));
console.log(renderUser(botUser, getPlayerScore(game, botUser.id)));
console.log(renderWeapons(weapons.items, weaponAction));
const weaponsHTML = renderWeapons(weapons.items, weaponAction);
const app = document.getElementById('app');
console.log(app);
app.appendChild(weaponsHTML);
