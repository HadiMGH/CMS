'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Countries", [
      {
        title:"ایران"

      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Countries", null, {});
  }
};
