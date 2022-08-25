'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Country , {foreignKey:"countryId"})
      this.hasMany(models.Township , {foreignKey:"provinceId"})
    }
  }
  Province.init({
    title: DataTypes.STRING,
    contryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Province',
  });
  return Province;
};