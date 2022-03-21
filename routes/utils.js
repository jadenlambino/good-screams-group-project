const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const listName = (listId) => {
  const lDiv = document.createElement("div");
  const aTag = document.createElement("a");
  aTag.className.add(`list-names a-tag-list-${listId}`);
  lDiv.appendChild(aTag);
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

module.exports = {
  csrfProtection,
  asyncHandler,
  getRandomInt,
};
