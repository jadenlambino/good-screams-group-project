const express = require('express')

const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');
const path = require('path');
const { requireAuth } = require('../auth');


router.post('/', asyncHandler(async (req, res) => {

}))


module.exports = router;
