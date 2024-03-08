const express = require('express')
const path = require('path')
const sq = require('better-sqlite3')
const session = require('express-session')

const bodyParser = require('body-parser')

 // create application/json parser
const jsonParser = bodyParser.json()

 // create application/x-www-form-urlencoded parser
const urlParser = bodyParser.urlencoded({ extended: false })
 

const publicPath = path.join(__dirname, './public')
const db = sq('databaseTest.db', {verbose: console.log})
const app = express()

// global data variables
let data = []

let username;
let password;
let familycode;

// function which gathers data from the database

/*
function gatherData(data, name, pass, family) {
    data = []
    data.push(db.prepare(`select * from profile where name = ? and password = ?`).get(name, pass))
    data.push(db.prepare(`select * from family where profileID = ?`).get(family))
    data.push(db.prepare("select * from profileFamily where familyID = ?").all(data[1].ID))
    data.push(db.prepare(`select * from familyTasks where familyID = ?`).all(data[1].ID))
    return data
}
*/

// i dont really know what this is yet
app.use(express.static(publicPath))
app.use(session({
    secret: 'still a secret',
    resave: false,
    saveUninitialized: false,
}));

// get funksjon som sender deg til html siden når nettsiden åpnes

app.get('/', (req, res) => {
    res.redirect("/login.html")
});

// get function som samler data og sender det til adressen til /data

app.get('/data', (req, res) => {
    try {
        res.send(gatherData(data, username, password, familycode ))
    } catch (err) {
        console.log(err)
    }
})

app.post('/login', urlParser, (req, res) => {

    if (req.body.name && req.body.password != undefined) {
        username = req.body.name
        password = req.body.password
        res.redirect("/main.html")
        console.log(username, password)
    } else {
        console.log("need username and password")
    }
})

// app.post for sing in feature
app.post('/signin', urlParser, (req, res) => {

})


//checks if user is in any families
app.get('/family', urlParser, (req, res) => {
    try {
        let id = db.prepare('select ID from profile where name = ? and password = ?').get(username, password)
        let data = db.prepare("select * from familyProfile where profileID = ?").all(id)
        res.send(data)
    } catch (err) {
        console.log("no family")
    }
})

// app.post for familycreate feature
app.post('/familycreate', urlParser, (req, res) => {

})

// app.post for task creation feature
app.post('/taskcreate', urlParser, (req, res) => {

})

app.listen(3000, () => {
    console.log('server is up on port 3000')
});