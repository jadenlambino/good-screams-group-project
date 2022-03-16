const express = require('express')

const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');
const path = require('path');
const { requireAuth } = require('../auth');


router.get('/', asyncHandler(async (req, res) => {
    const reviews = await db.Review.findAll({
        where: { movieId: 1 }
    })
   const jsonReviews = JSON.stringify(reviews)
    res.json(jsonReviews)
}));

router.post('/', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

}))


module.exports = router;
