require('../css/main.scss');

import { userData, getHumanUser, getBotUser, filterUsersById } from './users';
import { weaponsData, getWeapons } from './weapons';
import { gameData, reset, getState, addPlayer, addWeapons, play, checkIfWinner } from './game';

const humanUser = getHumanUser(userData);
const botUser = getBotUser(userData);
const weapons = getWeapons(weaponsData);
