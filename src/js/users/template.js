export {
  renderUser
};

function renderUser(user, score) {
  const div = document.createElement('div');
  div.className = 'user';
  div.innerHTML =  (`
    <h2 class="user__name">${user.name}</h2>
    <p class="user__type">${user.type}</p>
    <p class="user__score">${score}</p>
  `);

  return div;
}
