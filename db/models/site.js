'use strict';
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    name: DataTypes.STRING
  }, {});
  Site.associate = function(models) {
    // associations can be defined here
  };
  return Site;
};