export {
  renderUser
};

function renderUser(user, score, altUsers) {
  const div = document.createElement('div');
  div.className = 'user';
  div.innerHTML =  (`
    <h2 class="user__name">${user.name} <span class="user__type">(${user.type})</span></h2>
    <details>
      <summary>Switch User</summary>
    </details>
    <p class="user__score">score: ${score}</p>
  `);

  return div;
}
