"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      rating: {
        allowNull: false,
        type: Sequelize.NUMERIC(4, 2),
      },
      releaseDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      budget: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      revenue: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      subGenreId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "SubGenres" },
      },
      mediaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Media" },
      },
      castId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Casts" },
      },
      crewId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Crews" },
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
    return queryInterface.dropTable("Movies");
  },
};
