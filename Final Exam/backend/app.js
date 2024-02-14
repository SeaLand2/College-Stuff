const express = require("express")
const cors = require("cors")
const DBHandler = require("./database/databaseHandler")
const userRoute = require("./routes/users")
const adviceRoute = require("./routes/advice")

const app = express()
const PORT = 8000

// Tells the API to send JSON responses
app.use(express.json())
// Tells the API to use CORS to allow data to be sent back to the client
app.use(cors({
    credentials: true
}))

// Define the routes
app.use('/user', userRoute)
app.use('/advice', adviceRoute)

// Connect to the database
DBHandler.connect

// Say which port the API is on
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    console.log(`Connect here http://localhost:${PORT}`)
})