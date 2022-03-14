'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    subGenreId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'SubGenres' }
    },
    rating: {
      allowNull: false,
      type: DataTypes.NUMERIC(4, 2)
    }
  }, {});
  Movie.associate = function (models) {
    // associations can be defined here
  };
  return Movie;
};
