const express = require('express')

const app = express()

function(request, response) {
    response.send("Hello world")
}

app.get('', rootRoute)

app.listen(3000, () => {
    console.log('server is up on port 3000')
})