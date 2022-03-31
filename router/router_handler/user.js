const db = require("../../db/index")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const { result } = require("@hapi/joi/lib/base")

exports.regUser = (req, res) => {
    const userinfo = req.body
    console.log(userinfo)

    // query if the username is selected
    const sqlStr = "select * from ev_users where username=?"
    db.query(sqlStr, userinfo.username, (err, results)=>{  
        if(err){
            return res.cc(err)
        }

        console.log(results)

        if (err) return res.cc(err)
        //User bcrypt.hashSync()
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sql = 'insert into ev_users set ?'
        db.query(sql, {username: userinfo.username, password:userinfo.password}, (err, results)=>{
            if (err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc("User failed to register")
            res.cc('register success!', 0)
        })
    })

}

// Login validation part
exports.login = (req, res) => {
    //handle the form data
    const userinfo =  req.body
    const sql = 'select * from ev_users where username=?'

    db.query(sql, userinfo.username, (err, results)=>{
     
        if (err) return res.cc(err)
        // sql successfully excecuted
        
        if (results.length !== 1) return res.cc('Login failed!')

        // TODO: check if the password is correct.
        // compareResult (Boolean) = result returned by bycrypt.
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (compareResult === false) res.cc('please check your password and try again')
        
        // Generate the TokenString on the serverSide
        const user = {...results[0], password: '', user_pic: ''}
        console.log(user)

        // encrypted user's personal information, genterate token
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' })
        console.log(tokenStr)
        // use res.send() response the tokenStr back to client

        res.send({
            status: 0,
            message: "login_success",
            token: 'Bearer ' + tokenStr,
        })
    })
}