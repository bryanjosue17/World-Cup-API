const express = require("express");
const {
  getGameByParameter,
  getGames,
  createGame,
  editGame,
  deleteGame,
} = require("../controllers/game.controller");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
router.use(authMiddleware);

router.get("/game/:idGame", getGameByParameter);
router.get("/games", getGames);
router.post("/game", createGame);
router.put("/game/:idGame", editGame);
router.delete("/game/:idGame", deleteGame);

module.exports = (app) => app.use("/api", router);
