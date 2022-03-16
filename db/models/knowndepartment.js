"use strict";
module.exports = (sequelize, DataTypes) => {
  const KnownDepartment = sequelize.define(
    "KnownDepartment",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {}
  );
  KnownDepartment.associate = function (models) {
    // associations can be defined here
    KnownDepartment.hasMany(models.Cast, { foreignKey: "knownDepartmentId" });
    KnownDepartment.hasMany(models.Crew, { foreignKey: "knownDepartmentId" });
  };
  return KnownDepartment;
};
