'use strict';

const { generateHash } = require('./../utils/hash-password');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      let data = [];
      for(let a = 1; a <= 10; a++){
        let password = await generateHash(`sdfsdf${a}sdf`);
        data.push({
          name: 'John',
          email: `john${a}@gmail.com`,
          password: password,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      return queryInterface.bulkInsert('Users', data);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *s
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
