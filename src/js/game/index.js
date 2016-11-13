import { data } from './data';
import { reset, getState, init, addPlayer, switchPlayer, addWeapons, play, checkIfWinner, getPlayerScore, getPlayerWeapon } from './use-cases';
import { renderAutoGoButton, renderResetButton, renderMessage } from './template';

export {
  data,
  reset,
  getState,
  init,
  addPlayer,
  switchPlayer,
  addWeapons,
  play,
  checkIfWinner,
  getPlayerScore,
  getPlayerWeapon,
  renderAutoGoButton,
  renderResetButton,
  renderMessage
};
