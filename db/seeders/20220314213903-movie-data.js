"use strict";
const movieData = require("../../json/movieData.json");
const genreData = require("../../json/genreData.json");
const genreArr = genreData.genres;

const dataArr = [];
movieData.forEach((ele) => {
  dataArr.push({
    name: ele.original_title,
    subGenreId: genreArr.indexOf(ele.subgenre) + 1,
    rating: ele.vote_average / 2,
    posterImg: `https://image.tmdb.org/t/p/original${ele.poster_path}`,
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
    return queryInterface.bulkInsert("Movies", dataArr, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Movies", null, {});
  },
};
