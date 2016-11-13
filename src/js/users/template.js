require('./styles.scss');

export {
  renderUser
};

function renderUser(user, score, showAltUsers = false, altUsers, altHandler) {
  let altUsersHTML = null;
  if(showAltUsers && altUsers){

    altUsersHTML = document.createElement('div');
    altUsersHTML.className = 'alt-users';

    const details = document.createElement('details');
    details.className = 'alt-users__details';

    const summary = document.createElement('summary');
    summary.className = 'alt-users__summary';
    summary.innerHTML = 'SwitchUser';

    const ul = document.createElement('ul');
    ul.className = 'alt-users__list';

    altUsers.forEach((altUser) => {
      let li = document.createElement('li');
      li.className = 'alt-users__list-item'
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

  const userDiv = document.createElement('div');
  userDiv.className = 'user';

  const userBarDiv = document.createElement('div');
  userBarDiv.className = 'user__bar';

  const h2 = document.createElement('h2');
  h2.className = 'user__name';
  h2.innerHTML = `<span>${user.name}</span> <div class="user__type user__type--${user.type}"><span class="hide">${user.type}</span></div>`;

  const scoreDiv = document.createElement('p');
  scoreDiv.className = 'user__score';
  scoreDiv.innerHTML = `<h3 class="hide">score:</h3> ${score}`;

  userBarDiv.appendChild(h2);
  userBarDiv.appendChild(scoreDiv);

  userDiv.appendChild(userBarDiv);
  if(altUsersHTML){
    userDiv.appendChild(altUsersHTML);
  }

  return userDiv;
}
