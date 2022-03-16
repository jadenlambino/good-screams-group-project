"use strict";
module.exports = (sequelize, DataTypes) => {
  const SubGenre = sequelize.define(
    "SubGenre",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
    },
    {}
  );
  SubGenre.associate = function (models) {
    // associations can be defined here
    SubGenre.hasMany(models.Movie, { foreignKey: "subGenreId" });
    SubGenre.belongsToMany(models.User, {
      through: "FavGenre",
      otherKey: "userId",
      foreignKey: "subgenreId",
    });
  };
  return SubGenre;
};
