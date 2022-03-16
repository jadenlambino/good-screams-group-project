'use strict';
module.exports = (sequelize, DataTypes) => {
  const Crew = sequelize.define('Crew', {
    name: DataTypes.STRING,
    profileImg: DataTypes.TEXT,
    knownDepartmentId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER
  }, {});
  Crew.associate = function(models) {
    // associations can be defined here
  };
  return Crew;
};