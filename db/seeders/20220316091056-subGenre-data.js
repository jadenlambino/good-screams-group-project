"use strict";
const data = require("../../json/tableAssets.json");
const results = [];
data.subgenres.forEach((ele) => {
  results.push({
    name: ele,
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
    return queryInterface.bulkInsert("SubGenres", results, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("SubGenres", null, {});
  },
};
