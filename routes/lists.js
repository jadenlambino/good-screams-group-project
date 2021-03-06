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
    ``;
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
router.get(
  "/update",
  requireAuth,
  asyncHandler(async (req, res) => {
    let { userId } = req.session.auth;
    const lists = await db.List.findAll({
      include: db.Movie,
      where: {
        userId,
      },
      order: [["id", "ASC"]],
    });

    res.json({ lists });
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

    res.json({ message: "List was added", listId: list.id });
  })
);

router.patch(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const listId = parseInt(req.params.id, 10);

    const list = await db.List.findByPk(listId);

    if (list.name !== "Want to Watch") {
      list.name = req.body.name;
      await list.save();
      res.json({ message: "Successful" });
    } else if (list.name === "Want to Watch") {
      res.json({ message: `Cannot Edit "Want to Watch" List Name` });
    }
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const listId = parseInt(req.params.id, 10);
    const list = await db.List.findByPk(listId);

    if (list) {
      if (list.name !== "Want to Watch") {
        try {
          await list.destroy();
          res.json({ message: "success" });
        } catch (e) {
          res.json({ message: "List must be EMPTY to Delete" });
        }
      } else {
        res.json({ message: 'Cannot Delete "Want to Watch"' });
      }
    }
  })
);

module.exports = router;
