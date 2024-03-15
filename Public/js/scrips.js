/* function Person(name, family, isParent, points, email) {
    this.name = name;
    this.familyCode = family
    this.isParent = isParent 
    this.points = points;
    this.email = email;
}
*/
function makeARankList(num) {
    for (i = num; i > 0; i--) {
        
    }
}

//global variables

let personName;
let family;
// let isParent = true;
// let points = 0;
// let email;

// functions for the login section

/*
function logIn() {

    document.getElementById('Login').style.display = 'none';
    document.getElementById('family-login').style.display = 'block';
    personName = document.getElementById("name").value
    email = document.getElementById("email").value
}

function signUp() {

    document.getElementById('Login').style.display = 'none';
    document.getElementById('family-login').style.display = 'block';
    personName = document.getElementById("name").value
    email = document.getElementById("email").value
}
*/

// This part is for the task section

// Array of tasks
let taskArray = []
let pendingTaskArray = []

// Appends the array of tasks to the task list
function taskList() {

    document.getElementById('taskDiv').innerHTML = "<label></label"

    for (let val in taskArray) {
        document.getElementById('taskDiv').appendChild(taskArray[val])
        console.log(document.getElementById('taskDiv')[0])
    }
}


/* adds points to the global points variable, which is used to determine your
rank on the leaderboard of your family */

function completeTask(amountOfPoints, task) {
    
    pendingTaskArray.push(task)
    taskArray.pop(task)
    document.getElementById('taskConDiv').appendChild(task)

    points += parseInt(amountOfPoints)
    console.log(points)
    
};


/* adds a task to the task list by adding the value of the task input field and the
value input field, then it creates a button which gets a even listener with the
completeTask function in it
*/

/*
function add() {

    let taskValue = document.getElementById('taskValue').value

    let task = document.createElement('button')
    task.classList.add("butt")
    task.innerHTML = `<label">${document.getElementById('addTask').value}
    points(${taskValue})</label>`

    task.addEventListener('click', function() {
        completeTask(taskValue, task)
    });

    if (!taskArray.includes(task)) {
        taskArray.push(task)
        taskList()
    }

}
*/



// This part is for the family number section
/*
let familyCode = 0;
let you;
*/
/*
function familyLogIn() {

    familyCode = document.getElementById('familyNum').value

    you = new Person(personName, familyCode, isParent, points, email)

    document.getElementById('family-login').style.display = 'none'

    createProfile()
}

function createFamily() {

    familyCode = Math.floor(Math.random() * 10000000)

    you = new Person(personName, familyCode, isParent, points, email)

    document.getElementById('family-login').style.display = 'none'

    createProfile()
}


// Section for the profile page

function createProfile() {
    document.getElementById('profileName').innerHTML = `Name: ${you.name}`
    document.getElementById('profileEmail').innerHTML = `Email: ${you.email}`
    document.getElementById('profileFamily').innerHTML = `Family: ${you.familyCode}`
    if (isParent) {
        document.getElementById('profileParent').innerHTML = "Guardian: yes"
    } else {
        document.getElementById('profileParent').innerHTML = "Guardian: no"
    }
}

*/

//Mal for async function som skal oppdateres


function familyCreate() {
    try {
        let response = fetch('/families');
        let data = response.json();

        for (let val in data) {
            getElementById('familyContainer').innerHTML += `<div class="login_input">${data[val].familyID}</div>`
            console.log('successfully created family')
        }    
    } catch (e) {
        console.log(e);
    }
}

async function updateData() {
    try {
        let response =  await fetch('/data');
        let data = await response.json();
        console.log(data);

        

    } catch (err) {
        console.log("This went wrong: " + err)
    }

    setTimeout(updateData, 1000)

}

// Here i will run all the code
function main() {
    familyCreate();
    updateData();
}

main();