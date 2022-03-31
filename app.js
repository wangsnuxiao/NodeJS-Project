const express = require('express')
const app = express()
const joi = require("@hapi/joi")

//config cors middleware
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended: false}))

//config expressJWT middleware
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\api/]}))


// encapsolate res.cc
app.use((req, res, next) => {
    // Status default == 1 : Failed condition
    // err can be a error object or a string 
    res.cc = function(err, status = 1){ 
        res.send({
            status: status,
            message : err instanceof Error ? err.message : err
        })
    }

    next()

})
//Define Error middleware
app.use((err, req, res, next)=>{
    //validation failed error
    if(err instanceof joi.ValidationError)return res.cc(err)
    //
    if(err.name === 'UnauthorizedError') return res.cc('User Validation failed!')
    //unknown error
    res.cc(err)
})

//import and use user package
const userRouter = require('./router/user')
const { reset } = require('nodemon')
const res = require('express/lib/response')
app.use('/api', userRouter)

//import and use userinfo
userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)



//Start the server
app.listen(3008, () => {
    console.log('api server running at http://127.0.0.1/:3008')
})

