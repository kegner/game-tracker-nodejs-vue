const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game-controller.js");

const authCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(500).send("Not authenticated.");
  }
  next();
}

router.use(authCheck);

router.route("/")
  .get(gameController.getGames)
  .post(gameController.insertGame)
  .put(gameController.upsertGame);

router.route("/:id")
  .get(gameController.getGame)
  .delete(gameController.deleteGame);

module.exports = router;