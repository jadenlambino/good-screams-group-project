"use strict";
module.exports = (sequelize, DataTypes) => {
  const Crew = sequelize.define(
    "Crew",
    {
      name: {
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
      departmentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Departments" },
      },
      jobId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Jobs" },
      },
    },
    {}
  );
  Crew.associate = function (models) {
    // associations can be defined here
    Crew.belongsToMany(models.Movie, {
      through: " CrewMovie",
      foreignKey: "crewId",
      otherKey: "movieId",
    });
    Crew.belongsTo(models.Job, { foreignKey: "jobId" });
    Crew.belongsTo(models.Department, { foreignKey: "departmentId" });
    Crew.belongsTo(models.KnownDepartment, { foreignKey: "knownDepartmentId" });
  };
  return Crew;
};
