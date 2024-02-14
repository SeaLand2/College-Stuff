const mysql = require("mysql")
const bcrypt = require("bcrypt")

// Create the connection to the database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Fareham141",
    database: "healthadvicegroup"
})

// Connect to the mysql database as a function
function connectDB() {
    con.connect((err) => {
        if (err) {
            console.log("Cannot connect to database")
            console.log('err: ' + err)
        } else {
            console.log("Connected to database!")
        }
    })
}

// Convert rowdatapackets from mysql to objects
function packetToObj(packet) {
    var data = JSON.parse(JSON.stringify(packet))
    return data
}

// Add the user information to the database
const addUser = (email, password, callback) => {
    try {
        // Create the SQL query
        var sql = 'INSERT INTO accounts (accountid, email, password) VALUES (?,?,?)'
        var data = [null, email, password]
        // Send the query to the database
        con.query(sql, data, (err, res) => {
            if (err) {
                con.query('ALTER TABLE accounts AUTO_INCREMENT = 1')
                callback('cannot create account')
            } else {
                console.log(`account created for: ${email}`)
                callback('account created')
            }
        })
    } catch (err) {
        // User likely already exists
        callback('cannot create account')
    }
}

// Allow the user to login
const login = (email, password, callback) => {
    try {
        // Check if email is already in the database
        // this prevents getting a password from a
        // record that doesn't exist
        var sql = 'SELECT count(*) as cnt FROM accounts WHERE email = (?)'
        con.query(sql, email, (err, data) => {
            if (err) {
                console.log('err: ' + err)
            } else {
                if (data[0].cnt > 0) {
                    // Email exists
                    // Create the SQL query
                    var sql = 'SELECT password FROM accounts WHERE email = (?)'
                    var data = [email]
                    // Send the query to the database
                    con.query(sql, data, (err, res) => {
                        if (err) {
                            console.log('err: ' + err)
                            callback('error')
                        } else {
                            if (packetToObj(res) == '') {
                                callback('fail')
                            }
                            var accPassword = packetToObj(res)[0].password
                            // Check to see if entered password is correct
                            if (bcrypt.compareSync(password, accPassword)) {
                                console.log(`login success for: ${email}`)
                                callback('success')
                            } else {
                                console.log(`login fail for: ${email}`)
                                callback('fail')
                            }
                        }
                    })
                } else {
                    // Email doesn't exist
                    callback('fail')
                }
            }
        })
    } catch (err) {
        callback(err)
    }
}

// Update user data
const updateUser = (type, change, email, callback) => {
    // Create the SQL query depending on the type of update
    if (type == 'email') {
        var sql = 'UPDATE accounts SET email = ? WHERE email = ?' // new email , current email
    } else if (type == 'password') {
        var sql = 'UPDATE accounts SET password = ? WHERE email = ?' // new password , current email
    }
    var data = [change, email]
    // Send the query to the database
    con.query(sql, data, (err, res) => {
        if (err) {
            console.log('err: ' + err)
            callback('error')
        } else {
            var temp = packetToObj(res)
            // Check to see if entered password is correct
            if (temp.changedRows == 1) {
                console.log(`update ${type} success for ${email}`)
                callback('success')
            } else if (temp.changedRows > 1) {
                // Create an error to stop the API if too many rows are changed
                // This prevents users from encountering any issues that may be caused
                var error = new Error(`${type} update for ${email} changed too many rows`)
                throw error
            } else {
                console.log(`update ${type} fail for ${email}`)
                callback('fail')
            }
        }
    })
}

// Get the advice articles
const getAdvice = (type, callback) => {
    if (type == 'all') {
        var sql = 'SELECT * FROM advice'
        var data = ''
    } else {
        var sql = 'SELECT * FROM advice WHERE type = ?'
        var data = [type]
    }

    con.query(sql, data, (err, res) => {
        if (err) {
            console.log('err: ' + err)
            callback('error', '')
        } else {
            var data = packetToObj(res)
            callback('success', data)
        }
    })
}

// Export the functions so they can be used in other files
module.exports = {
    connect: connectDB(),
    register: addUser,
    login: login,
    update: updateUser,
    getAdvice: getAdvice
}