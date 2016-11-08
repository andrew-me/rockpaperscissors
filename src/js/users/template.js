export {
  renderUser
};

function renderUser(user, score, altUsers, altHandler) {
  let altUsersHTML = null;
  if(altUsers){

    altUsersHTML = document.createElement('div');
    altUsersHTML.className = 'alt-users';

    const details = document.createElement('details');
    details.className = 'alt-users__details';

    const summary = document.createElement('summary');
    summary.innerHTML = 'SwitchUser';

    const ul = document.createElement('ul');
    ul.className = 'alt-users__list';

    altUsers.forEach((altUser) => {
      let li = document.createElement('li');
      li.innerHTML = `${altUser.name}`;
      if(altHandler){
        li.onclick = altHandler(user.id, altUser.id);
      }
      ul.appendChild(li);
    });

    altUsersHTML.appendChild(details);
    details.appendChild(summary);
    details.appendChild(ul);
  }

  const div = document.createElement('div');
  div.className = 'user';

  const h2 = document.createElement('h2');
  h2.className = 'user__name';
  h2.innerHTML = `${user.name} <span class="user__type">(${user.type})</span>`;

  const p = document.createElement('p');
  p.className = 'user__score';
  p.innerHTML = `score: ${score}`;

  div.appendChild(h2);
  if(altUsersHTML){
    div.appendChild(altUsersHTML);
  }
  div.appendChild(p);

  return div;
}
