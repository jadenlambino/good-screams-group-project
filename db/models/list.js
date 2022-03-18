"use strict";
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    "List",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
    },
    {}
  );
  List.associate = function (models) {
    // associations can be defined here
    List.belongsToMany(models.Movie, {
      through: "MoviesList",
      foreignKey: "listId",
      otherKey: "movieId",
    });

    List.belongsTo(models.User, { foreignKey: "userId" });
  };
  return List;
};
