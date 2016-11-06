export {
  getHumanUser,
  getBotUser,
  filterUsersByType,
  filterUsersById,
  filterOutUsersById,
  getAltUserType
};

function getHumanUser(users) {
  validateUsers(users);
  const humanUsers = users.filter(user => user.type === 'human');
  return humanUsers[0];
}

function getBotUser(users) {
  validateUsers(users);
  const botUsers = users.filter(user => user.type === 'bot');
  return botUsers[0];
}

function filterUsersByType(users, type) {
  validateUsers(users);
  return users.filter(user => user.type === type);
}

function filterUsersById(users, id) {
  validateUsers(users);
  const filteredUsers = users.filter(user => user.id === id);
  return filteredUsers[0];
}

function filterOutUsersById(users, userIds) {
  validateUsers(users);
  return users.filter(
    user => userIds.findIndex((id) => id === user.id) === -1
  );
}

function validateUsers(users) {
  if (!(Array.isArray(users)) ||
      (!(users.length === 0) &&
      !(typeof users[0].id === 'number'))) {
    throw new Error('invalid users array');
  }
}

function getAltUserType(type) {
  if(type === 'bot') return 'human';
  if(type === 'human') return 'bot';
}
