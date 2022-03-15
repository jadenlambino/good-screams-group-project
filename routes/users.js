const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const userValidators = require('./validation')
const router = express.Router();
const bcrypt = require('bcryptjs')

const db = require('../db/models');
const { validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', csrfProtection, userValidators, asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = await db.User.build({
    firstName,
    lastName,
    email
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 12);
    newUser.hashedPassword = hashedPassword;
    await newUser.save();
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('')
  }

}))



module.exports = router;
