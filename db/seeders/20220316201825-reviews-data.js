'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Reviews', [{
     content: "This is a random review.",
     userId: 1,
     movieId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
   },
     {
    content: "This is another random review.",
     userId: 1,
     movieId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
     },
     {
    content: "I've seen better",
     userId: 1,
     movieId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
     }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
