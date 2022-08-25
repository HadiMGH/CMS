'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Township extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Province , {foreignKey:"provinceId"})
    }
  }
  Township.init({
    title: DataTypes.STRING,
    ProvincId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Township',
  });
  return Township;
};