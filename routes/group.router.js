const express = require("express");
const {
  getGroupByParameter,
  getGroupByQuery,
  getGroups,
  createGroup,
  editGroup,
  deleteGroup,
} = require("../controllers/group.controller");
const router = express.Router();

router.get("/group/:idGroup", getGroupByParameter);
router.get("/group", getGroupByQuery);
router.get("/groups", getGroups);
router.post("/group", createGroup);
router.put("/group/:idGroup", editGroup);
router.delete("/group/:idGroup", deleteGroup);

module.exports = app => app.use('/api', router)