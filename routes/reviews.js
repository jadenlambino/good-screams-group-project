const express = require("express");

const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const path = require('path');
const { requireAuth } = require('../auth');
const { check, validationResult } = require('express-validator');
const { Movie } = require('../db/models')

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

const reviewValidation = [
    check('content')
    .exists({ checkFalsey: true })
    .withMessage('Please fill out the texbox.')
]

router.post('/new', requireAuth, csrfProtection, reviewValidation, asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id, 10);

    const { content } = req.body;
    console.log(content)

    // const review = await db.Review.build({
    //     content,
    //     userId: res.locals.userId,
    //     movieId
    // });

    // const validatorErrors = validationResult(req)

    // if (validatorErrors.isEmpty()) {
    //     await review.save();
    //     res.json({message: "Success", post})
    // }
}))

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
