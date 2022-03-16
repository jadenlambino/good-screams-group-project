'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavGenre = sequelize.define('FavGenre', {
    userId: DataTypes.INTEGER,
    subGenreId: DataTypes.INTEGER
  }, {});
  FavGenre.associate = function(models) {
    // associations can be defined here
  };
  return FavGenre;
};