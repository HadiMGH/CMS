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
      this.hasMany(models.Status,{foreignKey:"statusId"}),
      this.hasMany(models.Supplier,{foreignKey:"supplierId"}),
      this.hasMany(models.Category,{foreignKey:"categoryID"}),
      this.hasMany(models.ProductDetails,{foreignKey:"productDetailId"})
    }
  }
  Product.init({
    title: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    productUnit: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
    productQuantity: DataTypes.INTEGER,
    productStatusId: DataTypes.INTEGER,
    supplierId: DataTypes.INTEGER,
    productDetailId: DataTypes.INTEGER,
    otherDetail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};