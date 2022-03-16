"use strict";
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    "Job",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {}
  );
  Job.associate = function (models) {
    // associations can be defined here
    Job.hasMany(models.Crew, { foreignKey: "jobId" });
  };
  return Job;
};
