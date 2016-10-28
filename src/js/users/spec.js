/* eslint-env mocha */
/* global expect:false */

import { getHumanUser, getBotUser, filterUsersById } from './use-cases';

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

  it('should filter users by id', () => {
    const userData = makeDummyUserData();
    const user = filterUsersById(userData, userData[0].id);
    expect(user.id).to.equal(userData[0].id);
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
