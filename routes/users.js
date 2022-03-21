const express = require("express");
const { csrfProtection, asyncHandler } = require("./utils");
const userValidators = require("./signup-validation");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { loginUser } = require("../auth");

const db = require("../db/models");
const { validationResult } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/signup", csrfProtection, (req, res) => {
  const newUser = db.User.build();
  res.render("sign-up-form2", {
    title: "Signup",
    newUser,
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/signup",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, hashedPassword } = req.body;

    const newUser = db.User.build({
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
      const defaultList = db.List.build({
        name: "Want to Watch",
        userId: newUser.id,
      });
      await defaultList.save();
      res.redirect("/home");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      console.log(errors);
      res.render("sign-up-form2", {
        title: "Signup",
        errors,
        newUser,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

module.exports = router;
