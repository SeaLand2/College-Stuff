const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fareham141',
    database: 'bean_and_brew'
})

// Connect to the MySQL database
function connectDatabase() {
    connection.connect((err) => {
        if (err)
            console.log(err)
        else
            console.log('Connected')
    })
}

// Run a query and returns the result
// If there is an error then try and reconnect ot the database
async function runQuery(command, objects, callback) {
    try {
        return connection.query(command, objects, callback)
    } catch (err) {
        console.log(err)
        console.log('Attempting to reconnect')
        connectDatabase()
    }
}

// Convert packets returned from MySQL into objects
function packetToObject(packet) {
    return JSON.parse(JSON.stringify(packet))
}

// exports the functions
// so they can be used within other files
module.exports = {
    runQuery: function(query) {
        runQuery(query, (err, result) => {
            if (err)
                console.log(err)
            else
                console.log(packetToObject(result))
        })
    },
    connect: connectDatabase()
}
