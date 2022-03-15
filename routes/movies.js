const express = require('express');
const db = require('../db/models');
const router = express.Router();
const { asyncHandler } = require('./utils');
const path = require('path');

router.get('/', asyncHandler(async(req, res) => {
    const allMovies = await db.Movie.findAll();
    res.render('movies', { title: 'Movies', allMovies });
}));


module.exports = router;
