const express = require('express')
const path = require('path')
const sq = require('better-sqlite3')
const session = require('express-session')

const publicPath = path.join(__dirname, '../public')
const db = sq('databaseTest.db', {verbose: console.log})
const app = express()

// global data variables
data = []

function gatherData(data, name, pass) {
    data = []
    data.push(db.prepare(`select * from profile where name = "${name}" and password = "${pass}"`))
    data.push(db.prepare(`select * from family where ID = ${data[0].ID}`))
    data.push(db.prepare(`select * from tasks where familyID = ${data[1].ID}`))
    console.log(data)
}

gatherData(data, 'Carl', 'banan123' )

app.use(express.static(publicPath))
app.use(session({
    secret: 'still a secret',
    resave: false,
    saveUninitialized: false,
}));

app.get('/', (req, res) => {
    res.redirect("/main.html")
});

app.listen(3000, () => {
    console.log('server is up on port 3000')
});