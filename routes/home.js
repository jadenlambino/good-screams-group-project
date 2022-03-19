const express = require("express");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const { requireAuth, restoreUser } = require("../auth");

const router = express.Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const genres = await db.SubGenre.findAll();
    const favgenres = await db.FavGenre.findAll({
      where: {
        userId,
      },
    });
    res.render("home", { title: "Home", favgenres, genres });
  })
);

module.exports = router;
