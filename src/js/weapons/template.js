export {
  renderWeapon,
  renderWeapons
};

function renderWeapon(weapon, handler) {
  const h2 = document.createElement('h2');
  h2.onclick = handler(weapon.id);
  h2.className = 'weapon__name';
  h2.innerHTML = weapon.name;

  const li = document.createElement('li');
  li.className = 'weapon';
  li.appendChild(h2);

  return li;
}

function renderWeapons(weapons, handler) {
  const ul = document.createElement('ul');
  ul.className = 'weapons';
  weapons.forEach((weapon) => {
    let li = renderWeapon(weapon, handler);
    ul.appendChild(li);
  });

  return ul;
}
