'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product,{foreignKey:"productDetailId"})
    }
  }
  ProductDetails.init({
    weight: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    lenght: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    brand: DataTypes.STRING,
    material: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductDetails',
  });
  return ProductDetails;
};