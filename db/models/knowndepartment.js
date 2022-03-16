'use strict';
module.exports = (sequelize, DataTypes) => {
  const KnownDepartment = sequelize.define('KnownDepartment', {
    name: DataTypes.STRING
  }, {});
  KnownDepartment.associate = function(models) {
    // associations can be defined here
  };
  return KnownDepartment;
};