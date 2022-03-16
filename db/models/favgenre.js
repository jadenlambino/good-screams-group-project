"use strict";
module.exports = (sequelize, DataTypes) => {
  const FavGenre = sequelize.define(
    "FavGenre",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      subGenreId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "SubGenres" },
      },
    },
    {}
  );
  FavGenre.associate = function (models) {
    // associations can be defined here
  };
  return FavGenre;
};
