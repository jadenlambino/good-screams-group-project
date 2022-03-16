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
<<<<<<< HEAD
        where: { movieId: 1 }
    })
    const jsonReviews = JSON.stringify(reviews)
    res.json(jsonReviews)
}));

router.post('/', asyncHandler(async (req, res) => {

}))

// router.patch('/:id(\\d+)', asyncHandler(async (req, res) => {
//     const review = await db.Review.findByPk(req.params.id);
//     review.content = req.body.content;
//     await review.save();
//     res.json({ message: "Review has been updated" })
// }))

=======
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
>>>>>>> main

module.exports = router;
