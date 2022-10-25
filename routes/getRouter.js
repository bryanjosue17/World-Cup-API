const express = require('express')
const router = express.Router()
const GetControllers = require('../controllers/getController')

router.get('/group/:idGroup', GetControllers.getGroupByParameter)
router.get('/group', GetControllers.getGroupByQuery)
router.get('/groups', GetControllers.getGroups)
router.get('/team/:idTeam', GetControllers.getTeamByParameter)
router.get('/team', GetControllers.getTeamByQuery)
router.get('/teams', GetControllers.getTeams)
router.get('/game/:idGame', GetControllers.getGameByParameter)
router.get('/games', GetControllers.getGames)
router.get('/stadiums', GetControllers.getStadium)


module.exports = app => app.use('/get', router)