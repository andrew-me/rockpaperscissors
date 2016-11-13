require('./styles.scss');

export {
  renderWeapon,
  renderWeapons
};

function renderWeapon(weapon, handler) {
  if(!weapon) return;

  let classes = 'weapon__name ';
  let wrap;

  if(handler){
    wrap = document.createElement('button');
    wrap.onclick = handler(weapon.id);
    classes += 'btn weapon__name--choice ';
  }
  else {
    wrap = document.createElement('div');
  }

  wrap.className = classes + 'weapon__name--' + weapon.name.toLowerCase();

  const span = document.createElement('span');
  span.className = 'hide';
  span.innerHTML = weapon.name;
  wrap.appendChild(span);

  const div = document.createElement('div');
  div.className = 'weapon';
  div.appendChild(wrap);

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
