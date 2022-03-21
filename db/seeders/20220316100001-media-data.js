"use strict";
const data = require("../../json/fullDetails.json");
const tableData = require("../../json/tableAssets.json");
const results = [];

data.forEach((ele, index) => {
  ele.media.forEach((media) => {
    let link;
    if (media.site === "YouTube") {
      link = `https://www.youtube-nocookie.com/embed/${media.key}`;
    } else {
      link = `https://vimeo.com/${media.key}`;
    }

    results.push({
      name: media.name,
      key: link,
      siteId: tableData.sites.indexOf(media.site) + 1,
      typeId: tableData.types.indexOf(media.type) + 1,
      movieId: index + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert("Media", results, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Media", null, {});
  },
};
