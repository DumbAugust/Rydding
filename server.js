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
const db = sq('testdatabase.db', {verbose: console.log})
const app = express()

// global data variables
let data = []

let username;
let password;
let profileID;
let familycode;
let familyID

// function which gathers data from the database

function gatherData(data, name, pass, family) {
    data = []
    data.push(db.prepare(`select * from profile where name = ? and password = ?`).get(name, pass))
    data.push(db.prepare(`select * from family where codes = ?`).get(familycode))
    data.push(db.prepare("select * from profileFamily where familyID = ? ORDER BY points DESC").all(data[1].ID))
    data.push(db.prepare(`select * from familyTasks where familyID = ?`).all(data[1].ID))
    return data
}

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

    username = req.body.name
    password = req.body.password
    let sql = db.prepare('SELECT ID from profile where name = ? and password = ?').get(username, password)

    if (sql != undefined) {
        profileID = sql.ID
        res.redirect("/main.html#Family")
        console.log(username, password, profileID)
    } else {
        console.log("username and password is incorrect")
    }

})

// app.post for sing in feature
app.post('/signin', urlParser, (req, res) => {

    username = req.body.name
    password = req.body.password

    let result = db.prepare('SELECT ID from profile where name = ? and password = ?').get(username, password)

    if (result == undefined) {
        result = db.prepare('INSERT INTO profile (name, password) VALUES (?, ?)').run(username, password)
        console.log(result)
        profileID = result.lastInsertRowid
        res.redirect("/main.html#Family")
        console.log(username, password, profileID)
    } else {
        console.log('user already exists')
    }
})


//checks if user is in any families
app.get('/family', urlParser, (req, res) => {
    let data = db.prepare("select * from profileFamily where profileID = ?").all(profileID)
    console.log(data)
    res.send(data)
})

// app.post for familycreate feature

app.post('/familyadd', urlParser, (req, res) => {
    let code = req.body.code

    let result = db.prepare("select * from family where codes = ?").get(code)

/* Checks if there is a family with the given code,
then checks if the person is not already in the family.
If both conditions are true. then adds user to the family */

    if (result != undefined) {
        if (db.prepare("select * from profileFamily where profileID = ?").get(profileID) == undefined) {
            familycode = code
            familyID = result.ID
            console.log(familyID)
            result = db.prepare("insert into profileFamily (familyID, profileID, points) values (?, ?, ?)").run(familyID, profileID, 0)
        } else {
            console.log("already in family")
        }
    } else {
        console.log("couldn't find family")
    }

})

app.post('/familycreate', urlParser, (req, res) => {
    let code = req.body.code

    let result = db.prepare("select * from family where codes = ?").get(code)

    if (result == undefined) {
        result = db.prepare("insert into family (codes) values (?)").run(code)
        familycode = code
        familyID = result.lastInsertRowid

        result = db.prepare("insert into profileFamily (profileID, familyID, points) values(?,?,?)").run(profileID, familyID, 0)
        console.log(result)
    }
})

app.post('/taskcreate', urlParser, (req, res) => {
    
    let task = req.body.task
    let value = req.body.value

    if (familyID != undefined) {

    let sql = db.prepare("Insert into familyTask (familyID, task, value) values(?,?,?)").run(familyID, task, value)
    console.log(sql)

    } else {
        console.log('not connected to family')
    }

})

app.post('/taskcomplete', urlParser, (req, res) => {

})


app.listen(3000, () => {
    console.log('server is up on port 3000')
})