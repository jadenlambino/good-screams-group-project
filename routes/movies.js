const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { asyncHandler } = require("./utils");
const path = require("path");
const { requireAuth, restoreUser } = require("../auth");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const subGenres = await db.SubGenre.findAll({ include: db.Movie });
    // const allMovies = await db.Movie.findAll({ include: db.SubGenre });
    // console.log(subGenres);
    res.render("movies", { title: "Movies", subGenres });
  })
);

router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const movie = await db.Movie.findByPk(id);

    if (movie) {
      res.render("movie-info", { title: movie.name, movie });
    }
  })
);

module.exports = router;
