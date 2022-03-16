'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cast = sequelize.define('Cast', {
    name: DataTypes.STRING,
    characterName: DataTypes.STRING,
    profileImg: DataTypes.TEXT,
    knownDepartmentId: DataTypes.INTEGER
  }, {});
  Cast.associate = function(models) {
    // associations can be defined here
  };
  return Cast;
};