"use strict";
module.exports = (sequelize, DataTypes) => {
  const CastMovie = sequelize.define(
    "CastMovie",
    {
      castId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Casts" },
      },
      movieId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Movies" },
      },
    },
    {}
  );
  CastMovie.associate = function (models) {
    // associations can be defined here
  };
  return CastMovie;
};
