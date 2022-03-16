"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cast = sequelize.define(
    "Cast",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      characterName: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      profileImg: {
        type: DataTypes.TEXT,
      },
      knownDepartmentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "KnownDepartments" },
      },
    },
    {}
  );
  Cast.associate = function (models) {
    // associations can be defined here
    Cast.belongsTo(models.KnownDepartment, { foreignKey: "knownDepartmentId" });
    Cast.belongsToMany(models.Movie, {
      through: " CastMovie",
      foreignKey: "castId",
      otherKey: "movieId",
    });
  };
  return Cast;
};
