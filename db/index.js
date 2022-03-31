const mysql =  require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'YourRootPassword',
    database: 'my_db_1',
})

module.exports = db
