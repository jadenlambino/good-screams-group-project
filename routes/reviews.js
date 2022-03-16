const express = require("express");

const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
// const path = require("path");
// const { requireAuth } = require("../auth");

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    console.log(res);
    const reviews = await db.Review.findAll({
      include: db.User,
      where: { movieId: movieId },
    });
    const jsonReviews = JSON.stringify(reviews);
    res.json(jsonReviews);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {})
);

module.exports = router;
