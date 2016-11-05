export {
  renderWeapon,
  renderWeapons
};

function renderWeapon(weapon, handler) {
  if(!weapon) return;

  const h2 = document.createElement('h2');
  if(handler){
    h2.onclick = handler(weapon.id);
  }

  h2.className = 'weapon__name';
  h2.innerHTML = weapon.name;

  const div = document.createElement('div');
  div.className = 'weapon';
  div.appendChild(h2);

  return div;
}

function renderWeapons(weapons, handler) {
  const ul = document.createElement('ul');
  ul.className = 'weapons';
  weapons.forEach((weapon) => {
    let li = document.createElement('li');
    let div = renderWeapon(weapon, handler);
    li.appendChild(div);
    ul.appendChild(li);
  });

  return ul;
}
