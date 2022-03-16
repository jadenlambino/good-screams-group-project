"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Crews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      profileImg: {
        type: Sequelize.TEXT,
      },
      knownDepartmentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "KnownDepartments" },
      },
      departmentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Departments" },
      },
      jobId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Jobs" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Crews");
  },
};
