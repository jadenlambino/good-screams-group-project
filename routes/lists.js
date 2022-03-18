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
    const lists = await db.List.findAll({
      include: db.Movie,
      where: {
        userId,
      },
      order: [["id", "ASC"]],
    });

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

router.patch(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const listId = parseInt(req.params.id, 10);

    const list = await db.List.findByPk(listId);

    if (list) {
      list.name = req.body.name;
      await list.save();
      res.json({ message: "Successful" });
    } else {
      res.json({ message: "List does not exist" });
    }
  })
);

module.exports = router;
