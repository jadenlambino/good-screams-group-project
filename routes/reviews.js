const express = require("express");

const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const { auth } = req.session;

    const reviews = await db.Review.findAll({
      include: db.User,
      where: { movieId: movieId },
    });
    console.log(reviews);
    const jsonReviews = JSON.stringify({ userId: auth.userId, reviews });

    res.json(jsonReviews);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => { })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    console.log("you have arrived at the route handler");
    const reviewId = parseInt(req.params.id, 10);
    const review = await db.Review.findByPk(reviewId, {});

    if (review) {
      await review.destroy();
      res.json({ message: "Success" });
      console.log(res.json());
    } else {
      res.json({ message: "Failure" });
    }
  })
);

module.exports = router;
