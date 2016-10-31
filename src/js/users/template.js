export {
  renderUser
};

function renderUser(user) {
  return (`<div class="user">
    <h2 class="user__name">${user.name}</h2>
    <p class="user__type">${user.type}</p>
  </div>`);
}
