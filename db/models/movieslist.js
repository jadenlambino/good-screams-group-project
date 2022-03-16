'use strict';
module.exports = (sequelize, DataTypes) => {
  const MoviesList = sequelize.define('MoviesList', {
    movieId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER
  }, {});
  MoviesList.associate = function(models) {
    // associations can be defined here
  };
  return MoviesList;
};