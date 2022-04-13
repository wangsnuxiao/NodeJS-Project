const express = require('express')

const router =  express.Router()

const userinfo_handler =  require('./router_handler/userinfo')


router.get('/userINFOOJIFOWJ', userinfo_handler.getUserInfo)

module.exports = router