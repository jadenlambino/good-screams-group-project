const express = require("express");
const db = require("../db/models");
const { csrfProtection, asyncHandler, getRandomInt } = require("./utils");
const { requireAuth, restoreUser } = require("../auth");
const { Sequelize } = require("../db/models");

const Op = Sequelize.Op;

const router = express.Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const fourMedia = new Set();
    const { userId } = req.session.auth;
    const genres = await db.SubGenre.findAll({
      include: db.Movie,
    });

    const userData = await db.User.findAll({
      include: {
        model: db.SubGenre,
        include: db.Movie,
      },
      where: {
        id: userId,
      },
    });

    const faveGenres = await db.FavGenre.findAll({
      where: {
        userId,
      },
      order: [["id", "ASC"]],
    });

    const allmovies = [];

    userData[0].SubGenres.forEach((ele) => {
      ele.Movies.forEach((el) => {
        allmovies.push(el);
      });
    });

    for (let i = 0; i < 4; i++) {
      if (fourMedia.size < 4) {
        fourMedia.add(allmovies[getRandomInt(0, allmovies.length)]);
      }
    }

    const fourArr = Array.from(fourMedia);

    res.render("home", { title: "Home", faveGenres, genres, fourArr });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { subGenreId } = req.body;
    const { userId } = req.session.auth;

    const favGenre = await db.FavGenre.build({
      subGenreId,
      userId,
    });

    if (favGenre) {
      await favGenre.save();
      res.json({ message: "Successful" });
    } else {
      res.json({ message: "Post Failed" });
    }
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { subGenreId } = req.body;
    const { userId } = req.session.auth;

    const favGenre = await db.FavGenre.findOne({
      where: {
        userId,
        subGenreId: parseInt(subGenreId, 10),
      },
    });

    if (favGenre) {
      await favGenre.destroy();
      res.json({ message: "Successful" });
    }
  })
);

module.exports = router;
