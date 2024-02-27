const express = require('express')
const path = require('path')
const sq = require('better-sqlite3')

const publicPath = path.join(__dirname, '../public')
const db = sq('database.db', {verbose: console.log})
const app = express()

const sqlProfile = db.prepare("select * from profile")
const sqlProfileRows = sqlProfile.all()
for (const row of sqlProfileRows) {
    console.log(row)
}

app.use(express.static(publicPath))


app.get('/', (req, res) => {
    res.send("Welcome to my application")
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})