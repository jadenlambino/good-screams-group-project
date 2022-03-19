"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "MoviesLists",
      [
        {
          movieId: 1,
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 2,
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 3,
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 4,
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 33,
          listId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 21,
          listId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 3,
          listId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 2,
          listId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 2,
          listId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 139,
          listId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 22,
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 12,
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 82,
          listId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("MoviesLists", null, {});
  },
};
