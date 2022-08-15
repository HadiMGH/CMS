'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Category , {foreignKey:'categoryId'})
      this.hasMany(models.ProductDetail , {foreignKey:'productDetailId'})
      this.hasMany(models.Status , {foreignKey:'statusId'})
      this.hasMany(models.Supplier , {foreignKey:'supplierId'})
    }
  }
  Product.init({
    title: DataTypes.STRING,
    productUnit: DataTypes.STRING,
    productPrice: DataTypes.STRING,
    productQuantity: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    productDetailId: DataTypes.INTEGER,
    supplierId: DataTypes.INTEGER,
    otherDetail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};