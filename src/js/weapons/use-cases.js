export {
  getAllWeapons
};

function getAllWeapons(weapons) {
  validateWeapons(weapons);
  return weapons;
}

function validateWeapons(weapons) {
  if (!(Array.isArray(weapons)) ||
      (!(weapons.length === 0) &&
      !(typeof weapons[0].id === 'number'))) {
    throw new Error('invalid weapons array');
  }
}
