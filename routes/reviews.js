const express = require("express");

const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const path = require("path");
const { requireAuth } = require("../auth");
const { check, validationResult } = require("express-validator");
const { Movie } = require("../db/models");

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const { auth } = req.session;

    const reviews = await db.Review.findAll({
      include: db.User,
      where: { movieId: movieId },
    });
    // console.log(reviews);
    const jsonReviews = JSON.stringify({ userId: auth.userId, reviews });

    res.json(jsonReviews);
  })
);

const reviewValidation = [
  check("content")
    .exists({ checkFalsey: true })
    .withMessage("Please fill out the texbox."),
];

router.post(
  "/new/movies/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    console.log(movieId);
    const { content } = req.body;
    const { userId } = req.session.auth;

    const userInfo = await db.User.findByPk(userId);

    const review = await db.Review.build({
      content,
      userId,
      movieId,
    });
    await review.save();
    res.json({ message: "Success", review, userInfo });
  })
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

router.patch(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const reviewId = parseInt(req.params.id, 10);
    const review = await db.Review.findByPk(reviewId);
    console.log(reviewId);

    if (review) {
      review.content = req.body.content;
      await review.save();
      res.json({ message: "Review has been updated", review });
    } else {
      res.json({ message: "Post does not exist" });
    }
  })
);

module.exports = router;
