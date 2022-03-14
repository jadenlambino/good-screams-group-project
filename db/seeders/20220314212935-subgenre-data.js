"use strict";
const data = require("../../json/genreData.json");
const dataArr = [];
data.genres.forEach((ele) => {
  dataArr.push({
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
    return queryInterface.bulkInsert("SubGenres", dataArr, {});
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
