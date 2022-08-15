'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  ProductDetail.init({
    weight: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    brand: DataTypes.STRING,
    material: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductDetail',
  });
  return ProductDetail;
};