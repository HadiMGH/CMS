'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      length: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      color: {
        type: Sequelize.STRING,
        allowNull:true
      },
      size: {
        type: Sequelize.STRING,
        allowNull:true
      },
      brand: {
        type: Sequelize.STRING,
        allowNull:true
      },
      material: {
        type: Sequelize.STRING,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductDetails');
  }
};