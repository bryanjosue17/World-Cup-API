const express = require('express')
const { createUser, loginUser } = require('../controllers/auth.controller')
const router = express.Router()

router.post('/register', createUser)
router.post('/authenticate', loginUser)

module.exports = app => app.use('/api', router)