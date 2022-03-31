const express = require('express')
const router = express.Router()

const userHandler = require('./router_handler/user')

//1. import schema middleware
const expressJoi = require("@escook/express-joi")
//2. import validation schema
const {reg_login_schema} = require('../schema/user')




// reg for new user
router.post('/reguser', expressJoi(reg_login_schema) , userHandler.regUser)
// Login
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router