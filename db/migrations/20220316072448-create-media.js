"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Media", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      key: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      siteId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Sites" },
      },
      typeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Types" },
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
    return queryInterface.dropTable("Media");
  },
};
