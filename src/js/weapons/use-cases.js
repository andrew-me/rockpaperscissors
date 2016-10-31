export {
  getWeapons,
  getAllWeaponsData,
  getRandomWeapon,
  filterWeaponsById,
  declareWinner
};

function getWeapons(weapons) {
  validateWeapons(weapons);
  return {
    getAllWeaponsData: getAllWeaponsData,
    getRandomWeapon: getRandomWeapon,
    filterWeaponsById: filterWeaponsById,
    declareWinner: declareWinner,
    items: weapons
  }
}

function getAllWeaponsData(weapons) {
  validateWeapons(weapons);
  return weapons;
}

function getRandomWeapon(weapons) {
  validateWeapons(weapons);
  const weapon = weapons[Math.floor(Math.random()*weapons.length)];
  return weapon;
}

function filterWeaponsById(weapons, id) {
  validateWeapons(weapons);
  const filteredWeapons = weapons.filter(weapon => weapon.id === id);
  return filteredWeapons[0];
}

function declareWinner(weapons, id1, id2) {
  if(id1 === id2) return {
    id: -1,
    message: 'Draw'
  }

  validateWeapons(weapons);
  const weapon1 = filterWeaponsById(weapons, id1);
  const weapon2 = filterWeaponsById(weapons, id2);

  const checkWeapon1 = weapon1.beats.filter(beat => beat.id === id2);
  if(checkWeapon1.length) return {id:id1, message: checkWeapon1[0].message};

  const checkWeapon2 = weapon2.beats.filter(beat => beat.id === id1);
  if(checkWeapon2.length) return {id:id2, message: checkWeapon2[0].message};

  return {
    id: -1,
    message: 'Draw'
  }
}

function validateWeapons(weapons) {
  if (!(Array.isArray(weapons)) ||
      (!(weapons.length === 0) &&
      !(typeof weapons[0].id === 'number'))) {
    throw new Error('invalid weapons array');
  }
}
