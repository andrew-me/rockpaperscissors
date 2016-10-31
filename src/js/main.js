require('../css/main.scss');

import { data as userData, getHumanUser, getBotUser, renderUser } from './users';
import { data as weaponsData, getWeapons } from './weapons';
import { data as gameData, init } from './game';

const humanUser = getHumanUser(userData.users);
const botUser = getBotUser(userData.users);
const weapons = getWeapons(weaponsData.weapons);

let game = init(gameData, botUser.id, humanUser.id, weapons);

console.log(game);

console.log(renderUser(humanUser));
