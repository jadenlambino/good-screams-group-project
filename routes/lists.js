const express = require("express");

const router = express.Router();
const { asyncHandler } = require("./utils");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.render("lists", { title: "Lists" });
  })
);

module.exports = router;
