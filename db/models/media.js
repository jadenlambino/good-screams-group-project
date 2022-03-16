'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    siteId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER
  }, {});
  Media.associate = function(models) {
    // associations can be defined here
  };
  return Media;
};