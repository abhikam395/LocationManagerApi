'use strict';

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
      let latlongs = [{lat: 30.3165, long: 78.1322}, 
        {lat: 30.3165, long: 78.4322}, 
        {lat: 30.3165, long: 78.5322},
        {lat: 30.3165, long: 78.7322}];

      for(let a = 1; a <= 4; a++){
        let location = latlongs[a - 1];
        data.push({
          userId: a,
          latitude: location.lat,
          longitude: location.long,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      return queryInterface.bulkInsert('Locations', data);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
