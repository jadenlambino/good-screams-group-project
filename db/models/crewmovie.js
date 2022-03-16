"use strict";
module.exports = (sequelize, DataTypes) => {
  const CrewMovie = sequelize.define(
    "CrewMovie",
    {
      movieId: {
        type: DataTypes.INTEGER,
        references: { model: "Movies" },
      },
      crewId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Crews" },
      },
    },
    {}
  );
  CrewMovie.associate = function (models) {
    // associations can be defined here
  };
  return CrewMovie;
};
