"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Casts", {
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
      characterName: {
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
    return queryInterface.dropTable("Casts");
  },
};
