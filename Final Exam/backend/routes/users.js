const express = require("express")
const bcrypt = require("bcrypt")
const DBHandler = require("../database/databaseHandler")

// Generate the salt for password hashing
const salt = bcrypt.genSaltSync(10);

const router = express.Router()

// Add an account to the database
// http://localhost:8000/user/register
router.post('/register', (req, res) => {
    var user = req.body.user

    // hash password using bcrypt
    var hash = bcrypt.hashSync(user.password, salt)

    DBHandler.register(user.email, hash, (result) => {
        // Send info back to client
        if (result == 'account created') {
            res.json({ 'result': 'account created' })
        } else if (result == 'cannot create account') {
            res.json({ 'result': 'cannot create account' })
        } else {
            res.json({ 'result': 'error' })
        }
        res.end()
    })
})

// Allow a user to login
// http://localhost:8000/user/login
router.post('/login', (req, res) => {
    var user = req.body.user

    DBHandler.login(user.email, user.password, (result) => {
        // Send info back to client
        if (result == 'success') {
            res.json({ 'result': 'login' })
        } else if (result == 'fail') {
            res.json({ 'result': 'fail' })
        } else if (result == 'error') {
            res.json({ 'result': 'error' })
        }
        res.end()
    })
})

// Update account info
// http://localhost:8000/user/update
router.post('/update', (req, res) => {
    var data = req.body.data
    var change = data.change
    console.log('update user')
    // If the user is changing password than hash it
    if (data.type == 'password') {
        var change = bcrypt.hashSync(change, salt)
    }

    DBHandler.update(data.type, change, data.email, (result) => {
        // Send info back to the client
        if (result == 'success') {
            res.json({ 'result': 'success' })
        } else if (result == 'fail') {
            res.json({ 'result': 'fail' })
        } else if (result == 'error') {
            res.json({ 'result': 'error' })
        }
        res.end()
    })
})

module.exports = router