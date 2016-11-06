/* eslint-env mocha */
/* global expect:false */

import { getHumanUser, getBotUser, filterUsersByType, filterUsersById, filterOutUsersById } from './use-cases';

describe('users', () => {

  it('should return a human user', () => {
    const userData = makeDummyUserData();
    const humanUser = getHumanUser(userData);
    expect(humanUser.type).to.equal('human');
	});

  it('should return a bot user', () => {
    const userData = makeDummyUserData();
    const botUser = getBotUser(userData);
    expect(botUser.type).to.equal('bot');
	});

  it('should filter users by type', () => {
    const userData = makeDummyUserData();
    const users = filterUsersByType(userData, 'bot');
    expect(users.length).to.equal(2);
    expect(users[0].type).to.equal('bot');
    expect(users[1].type).to.equal('bot');
	});

  it('should filter users by id', () => {
    const userData = makeDummyUserData();
    const user = filterUsersById(userData, userData[0].id);
    expect(user.id).to.equal(userData[0].id);
	});

  it('should filter out users by id', () => {
    const userData = makeDummyUserData();
    const usersIds = [1, 3];
    const users = filterOutUsersById(userData, usersIds);
    expect(users.length).to.equal(2);
    expect(users[1].id).to.equal(2);
	});

});

function makeDummyUserData() {
  const users = [{
    id: 0,
    name: 'You',
    type: 'human'
  }, {
    id: 1,
    name: 'Robert',
    type: 'bot'
  }, {
    id: 2,
    name: 'Me',
    type: 'human'
  }, {
    id: 3,
    name: 'Botham',
    type: 'bot'
  }];

	return users;
}
