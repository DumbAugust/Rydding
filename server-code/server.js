const express = require('express')
const path = require('path')
const sq = require('better-sqlite3')
const session = require('express-session')

const publicPath = path.join(__dirname, '../public')
const db = sq('databaseTest.db', {verbose: console.log})
const app = express()

const sqlProfile = db.prepare("select * from profile")
const sqlProfileRows = sqlProfile.all()
for (const row of sqlProfileRows) {
    console.log(row)
}

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