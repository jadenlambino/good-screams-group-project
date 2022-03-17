"use strict";
const data = require("../../json/fullDetails.json");
const users = require("../../json/sampleUsers.json");
const reviewArr = [
  "This movie caused me to fall asleep.",
  "Best movie ever!",
  "A MUST-SEE for anyone who loves Horror Movies",
  "What an Adventure!!",
  "This movie was alright. The special effects were terrible though!",
  "I only watched this because I was bored. It was more boring than staring at the wall.",
  "This was the best movie I've ever seen! I can't wait for the sequel!",
  "The book was way better than the movie! They left out all the good parts!!!",
  "Whoever directed this needs an award! GREAT movie!",
  "OMG!!! SO SCARY!! I had nightmares last night!",
  "This movie was more like a comedy since it was so bad. Wouldn't say that it was a horror film...",
  "Pffffft... Not even scary. LAME!",
  "Unoriginal.",
  "This is my new favorite movie! So good!",
  "Excellent acting. Give this cast some Oscars!",
];
const results = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

let counter = 140;

for (let i = 1; i <= counter; i++) {
  const rand = getRandomInt(1, 5);
  for (let j = 0; j < rand; j++) {
    results.push({
      content: reviewArr[getRandomInt(0, 15)],
      userId: getRandomInt(1, 7),
      movieId: i,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

// data.forEach((ele, index) => {
//   ele.reviews.forEach((reviews) => {});
// });

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert("Reviews", results, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Reviews", null, {});
  },
};
