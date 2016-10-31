export {
  renderUser
};

function renderUser(user) {
  return (`<div class="user">
    <h2>${user.name}</h2>
    <p>${user.type}</p>
  </div>`);
}
