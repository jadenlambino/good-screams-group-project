"use strict";
const users = require("../../json/sampleUsers.json");
const results = [];
users.forEach((ele) => {
  results.push({
    firstName: ele.firstName,
    lastName: ele.lastName,
    email: ele.email,
    hashedPassword: ele.hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert("Users", results, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
