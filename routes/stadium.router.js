const express = require("express");

const {
  getStadium,
  createStadium,
  editStadium,
  deleteStadium,
} = require("../controllers/stadium.controller");

const router = express.Router();

router.get("/stadiums", getStadium);
router.post("/stadium", createStadium);
router.put("/stadium/:idStadium", editStadium);
router.delete("/stadium/:idStadium", deleteStadium);

module.exports = (app) => app.use("/api", router);
