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
    const { userId } = req.session.auth;
    const id = parseInt(req.params.id, 10);
    const movie = await db.Movie.findByPk(id, {
      include: [db.Review],
    });
    const lists = await db.List.findAll({
      where: { userId },
      order: [["id", "ASC"]],
    });

    if (movie) {
      res.render("movie-info", { title: movie.name, movie, lists, userId });
    }
  })
);

router.post(
  "/:id(\\d+)/add",
  asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const { listId } = req.body;
    const pairConnection = await db.MoviesList.build({
      movieId,
      listId,
    });
    await pairConnection.save();
    res.json({ message: "Success" });
  })
);

router.delete(
  "/:id(\\d+)/remove",
  asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const { listId } = req.body;
    const movieList = await db.MoviesList.findOne({
      where: {
        listId,
        movieId,
      },
    });

    if (movieList) {
      movieList.destroy();
      res.json({ message: "Successful" });
    }
  })
);

module.exports = router;
