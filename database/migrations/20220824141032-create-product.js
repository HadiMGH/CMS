'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:{
          model:"Categories",
          key:"id"
        } 
      },
      productUnit: {
        type: Sequelize.STRING
      },
      productPrice: {
        type: Sequelize.INTEGER
      },
      productQuantity: {
        type: Sequelize.INTEGER
      },
      productStatusId: {
        type: Sequelize.INTEGER,
        references:{
          model:"Statuses",
          key:"id"
        } 
      },
      supplierId: {
        type: Sequelize.INTEGER,
        references:{
          model:"Suppliers",
          key:"id"
        } ,
        allowNull:true
      },
      productDetailId: {
        type: Sequelize.INTEGER,
        references:{
          model:"ProductDetails",
          key:"id"
        }
      },
      otherDetail: {
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
    await queryInterface.dropTable('Products');
  }
};