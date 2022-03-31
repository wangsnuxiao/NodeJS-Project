const db = require('../../db/index')


exports.getUserInfo = (req, res) => {
    // define users SQL
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?' 
    db.query(sql, req.user.id, (err, results) =>{
        // failed to excecute SQL
        if(err) return res.cc(err)
        if (results.length !== 1) return res.cc('Failed to fetech userinfo')
        
        // Successfully fectch user infomations
        res.send({
            status: 0,
            message: "SUCCESS!",
            data: results[0]
        })
    })
}