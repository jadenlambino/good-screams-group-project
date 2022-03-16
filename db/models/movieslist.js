"use strict";
module.exports = (sequelize, DataTypes) => {
  const MoviesList = sequelize.define(
    "MoviesList",
    {
      movieId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Movies" },
      },
      listId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Lists" },
      },
    },
    {}
  );
  MoviesList.associate = function (models) {
    // associations can be defined here
  };
  return MoviesList;
};
