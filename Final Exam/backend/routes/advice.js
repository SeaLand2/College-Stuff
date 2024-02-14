const express = require("express")
const DBHandler = require("../database/databaseHandler")

const router = express.Router()

// Recieve the advice articles from database and send back to frontend
//http://localhost:8000/advice/getAdvice
router.post('/getAdvice', (req, res) => {
    var adviceType = req.body.type

    DBHandler.getAdvice(adviceType, (result, data) => {
        if (result == 'success') {
            if (data != '') {
                res.json({ 'data': { 'result': 'success', 'data': data } })
            } else {
                res.json({ 'data': { 'result': 'fail', 'data': '' } })
            }
        } else {
            res.json({ 'data': { 'result': 'fail', 'data': '' } })
        }
        res.end()
    })
})

module.exports = router