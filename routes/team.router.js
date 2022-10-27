const express = require("express");
const {
  getTeamByParameter,
  getTeamByQuery,
  getTeams,
  createTeam,
  editTeam,
  deleteTeam,
} = require("../controllers/team.controller");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
router.use(authMiddleware);
router.get("/team/:idTeam", getTeamByParameter);
router.get("/team", getTeamByQuery);
router.get("/teams", getTeams);
router.post("/team", createTeam);
router.put("/team/:idTeam", editTeam);
router.delete("/team/:idTeam", deleteTeam);

module.exports = (app) => app.use("/api", router);
