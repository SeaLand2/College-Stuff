const express = require('express')
const mysql = require('mysql')
const DBHandler = require('./database/databaseHandler')

var indexRouter = require('./routes/index')

var app = express()
var port = 3000
var router = express.Router()


app.use('/', indexRouter)

// Allows the app to run on port 3000
app.listen(port, () => {
    console.log(`Listening on http://127.0.0.1:${port}`)
})


//connect to the MySQL database
DBHandler.connect

var test = 'SELECT * FROM blogs'

DBHandler.runQuery(test)