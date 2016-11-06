export {
  renderUser
};

function renderUser(user, score, altUsers) {
  let altUsersHTML = '';
  if(altUsers){
    altUsersHTML = altUsers.map((altUser) => `<li>${altUser.name}</li>`);
    altUsersHTML = `<details><summary>Switch User</summary><ul>${altUsersHTML}</ul></details>`;
  }

  const div = document.createElement('div');
  div.className = 'user';
  div.innerHTML =  (`
    <h2 class="user__name">${user.name} <span class="user__type">(${user.type})</span></h2>
    ${altUsersHTML}
    <p class="user__score">score: ${score}</p>
  `);

  return div;
}
