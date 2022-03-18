const express = require("express");

const router = express.Router();
const { asyncHandler } = require("./utils");

const { requireAuth } = require("../auth");

const db = require("../db/models");

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    let { userId } = req.session.auth;
    console.log(userId);
    const lists = await db.List.findAll();
    res.render("lists", { title: "Lists", lists, id: userId });
  })
);

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    let { userId } = req.session.auth;

    const list = await db.List.build({
      name,
      userId,
    });

    await list.save();
    res.json({ message: "List was added" });
  })
);

module.exports = router;
