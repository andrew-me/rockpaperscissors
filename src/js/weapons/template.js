require('./styles.scss');

export {
  renderWeapon,
  renderWeapons
};

function renderWeapon(weapon, handler) {
  if(!weapon) return;

  let classes = 'weapon__name ';

  const h2 = document.createElement('h2');
  if(handler){
    h2.onclick = handler(weapon.id);
    classes += 'weapon__name--choice ';
  }

  h2.className = classes + 'weapon__name--' + weapon.name.toLowerCase();

  const span = document.createElement('span');
  span.className = 'hide';
  span.innerHTML = weapon.name;
  h2.appendChild(span);

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
    li.className = 'weapon__item';
    let div = renderWeapon(weapon, handler);
    li.appendChild(div);
    ul.appendChild(li);
  });

  return ul;
}
