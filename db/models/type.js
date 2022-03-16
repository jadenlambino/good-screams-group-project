"use strict";
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    "Type",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {}
  );
  Type.associate = function (models) {
    // associations can be defined here
    Type.hasMany(models.Media, { foreignKey: "typeId" });
  };
  return Type;
};
