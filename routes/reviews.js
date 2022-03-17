const express = require("express");

const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");


router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
      const movieId = parseInt(req.params.id, 10);



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



router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    console.log('you have arrived at the route handler')
    const reviewId = parseInt(req.params.id, 10)
    const review = await db.Review.findByPk(reviewId, {

    })

    if (review) {
        await review.destroy();
        res.json({ message: "Success" })
        console.log(res.json())
    } else {
        res.json({ message: "Failure" })
    }
}));

module.exports = router;
