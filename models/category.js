'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
  
    static associate(models) {
     this.belongsTo(models.Product,{foreignKey:"categoryId"})
    }
  }
  Category.init({
    title: DataTypes.STRING,
    parentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};