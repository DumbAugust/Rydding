//global variables

let data;

//Mal for async function som skal oppdateres

function familiesCreate(arr) {

    document.getElementById('familiesContainer').innerHTML = "<div></div>"
        
    for (let i = 0; i < arr.length; i++) {
            
        document.getElementById('familiesContainer').innerHTML += `<div class="El">${arr[i].codes}</div>`
    
    }   
}

function familyCreate(arr) {

    document.getElementById('familyContainer').innerHTML = "<div></div>"
    
    for (let i = 0; i < arr.length; i++) {
        
        document.getElementById('familyContainer').innerHTML += `<div class="El">${arr[i].name} points: ${arr[i].points}</div>`

    }   
}


function taskCreate(arr) {

    document.getElementById('taskContainer').innerHTML = "<div></div>"
    
    for (let i = 0; i < arr.length; i++) {

        let div = document.createElement('div')
        div.classList.add("El")

        let label = document.createElement('label')
        label.innerHTML = `<label">${arr[i].task} points(${arr[i].value})</label>`

        let task = document.createElement('input')
        task.type = "checkbox"
        task.name = `name${i}`
        task.value = arr[i].value
        task.classList.add("butt")

        div.appendChild(task)
        div.appendChild(label)

        document.getElementById('taskContainer').appendChild(div)

    }   

    document.getElementById('taskContainer').innerHTML += `<button class="anotherButt" type="submit">Add</button>`
}


async function updateData() {
    try {

        let response =  await fetch('/data');
        data = await response.json();


        familiesCreate(data[0])
        taskCreate(data[1])
        familyCreate(data[2])
        

        

    } catch (err) {
        console.log("This went wrong: " + err)
    }

    setTimeout(updateData, 1000)

}
    

updateData();