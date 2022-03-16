'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: DataTypes.STRING,
    rating: DataTypes.NUMERIC,
    releaseDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    budget: DataTypes.INTEGER,
    revenue: DataTypes.INTEGER,
    subGenreId: DataTypes.INTEGER,
    mediaId: DataTypes.INTEGER,
    castId: DataTypes.INTEGER,
    crewId: DataTypes.INTEGER
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};