const express = require('express')

const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const path = require('path');
const { requireAuth } = require('../auth');
const { check, validationResult } = require('express-validator');
const { Movie } = require('../db/models')

router.get('/', asyncHandler(async (req, res) => {
    const reviews = await db.Review.findAll({
        where: { movieId: 1 }
    })
   const jsonReviews = JSON.stringify(reviews)
    res.json(jsonReviews)
}));

const reviewValidation = [
    check('content')
    .exists({ checkFalsey: true })
    .withMessage('Please fill out the texbox.')
]

router.get('/new', csrfProtection, requireAuth, async(req,res,next) => {
    const movies = await Movie.findAll();
    res.render('review-form', {
        title: 'New Review',
        movies,
        errors: [],
        csrfToken: req.csrfToken()
    })
});

router.post('/new', requireAuth, csrfProtection, reviewValidation, asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.movieId, 10);

    const { content } = req.body;

    const review = db.Review.build({
        content,
        userId: res.locals.userId,
        movieId
    });

    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
        await review.save();
        res.redirect(`/movies/${movieId}`)
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('review-form'), {
            title: 'New Review',
            content,
            errors,
            csrfToken: req.csrfToken(),
        }
    }
}))


module.exports = router;
