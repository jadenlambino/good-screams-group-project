"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CastMovies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      castId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Casts" },
      },
      movieId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Movies" },
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
    return queryInterface.dropTable("CastMovies");
  },
};
