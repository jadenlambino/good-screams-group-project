"use strict";
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      rating: {
        allowNull: false,
        type: DataTypes.NUMERIC(4, 2),
      },
      releaseDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      posterImg: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      budget: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      revenue: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      subGenreId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "SubGenres" },
      },
    },
    {}
  );
  Movie.associate = function (models) {
    // associations can be defined here

    Movie.belongsToMany(models.List, {
      through: "MoviesList",
      foreignKey: "movieId",
      otherKey: "listId",
    });

    Movie.hasMany(models.Media, { foreignKey: "movieId" });
    Movie.hasMany(models.Review, { foreignKey: "movieId" });
  };
  return Movie;
};
