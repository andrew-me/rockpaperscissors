export {
  renderUser
};

function renderUser(user, score) {
  return (`<div class="user">
    <h2 class="user__name">${user.name}</h2>
    <p class="user__type">${user.type}</p>
    <p class="user__score">${score}</p>
  </div>`);
}
