'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubGenre = sequelize.define('SubGenre', {
    name: DataTypes.STRING
  }, {});
  SubGenre.associate = function(models) {
    // associations can be defined here
  };
  return SubGenre;
};