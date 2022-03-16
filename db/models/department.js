"use strict";
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {}
  );
  Department.associate = function (models) {
    // associations can be defined here
    Department.hasMany(models.Crew, { foreignKey: "departmentId" });
  };
  return Department;
};
