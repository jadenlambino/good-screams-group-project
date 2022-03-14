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
    Movie.belongsTo(models.SubGenre, { foreignKey: 'subGenreId' })
    Movie.hasMany(models.Review, { foreignKey: 'moviesId' })
    Movie.belongsToMany(models.List, {
      through: 'MoviesList',
      foreignKey: 'moviesId',
      otherKey: 'listsId'
    })
  };
  return Movie;
};
