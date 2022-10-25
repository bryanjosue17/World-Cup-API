const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')
// Route Game
router.post('/group', dataController.createGroup)
router.put('/group/:idGroup', dataController.editGroup)
router.delete('/group/:idGroup', dataController.deleteGroup)
// Route Team
router.post('/team', dataController.createTeam)
router.put('/team/:idTeam', dataController.editTeam)
router.delete('/team/:idTeam', dataController.deleteTeam)
// Route Game
router.post('/game', dataController.createGame)
router.put('/game/:idGame', dataController.editGame)
router.delete('/game/:idGame', dataController.deleteGame)
// Route Stadium
router.post('/stadium', dataController.createStadium)




module.exports = app => app.use('/data', router)