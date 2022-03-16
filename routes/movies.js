const express = require('express');
const db = require('../db/models');
const router = express.Router();
const { asyncHandler } = require('./utils');
const path = require('path');
const { requireAuth } = require('../auth');

router.get('/', asyncHandler(async(req, res) => {
    const allMovies = await db.Movie.findAll();
    res.render('movies', { title: 'Movies', allMovies });
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const movie = await db.Movie.findByPk(id)

    if (movie) {
        res.render('movie-info', { title: movie.name, movie });
    }
}))

module.exports = router;
