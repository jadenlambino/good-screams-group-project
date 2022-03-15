const express = require("express");
const { csrfProtection, asyncHandler } = require("./utils");
const userValidators = require("./validation");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { loginUser } = require("../auth");

const db = require("../db/models");
const { validationResult } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const newUser = await db.User.build();
    res.render("sign-up", {
      title: "Signup",
      newUser,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/signup",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, hashedPassword } = req.body;

    const newUser = await db.User.build({
      firstName,
      lastName,
      email,
    });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashed = await bcrypt.hash(hashedPassword, 12);
      newUser.hashedPassword = hashed;
      await newUser.save();
      loginUser(req, res, newUser);
      res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      console.log(errors);
      res.render("sign-up", {
        title: "Signup",
        errors,
        newUser,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

module.exports = router;
