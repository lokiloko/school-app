'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
        username: 'johndoe',
        password: 'dbf492fd6777677e552d8704245130f36cb655f5990c2ea9ca97605a27c16b56',
        role: 'teacher',
        salt: 'V7Pafisz'
      },{
        username: 'pakdengklek',
        password: '03147d7d3be41e55a5d720b4644416f0fbdd2d57ccefca584f51d2669f75b221',
        role: 'academic',
        salt: 'qkSx9J9f'
      },{
        username: 'charlesxavier',
        password: 'fa3cf43b6e5010f80f1e2b646a1ace377a8cf1546e5656785fe31621b3ad8f41',
        role: 'headmaster',
        salt: 'SDE3Eamf'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
