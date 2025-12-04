const express = require('express');
const path = require('path');
const app = express();
const port = 3000
const root = path.join(__dirname, 'public')


app.use(express.json()) // allows us to send json
app.use(express.static('public')) // allows us to response with static webpages

app.get('/', (request, response) => { 
    response.sendFile('index.html', {root})})

app.get('/test', (request, response) => { 
    response.send('This test route is working!')})

app.listen(port, () => console.log(`http://localhost:${port}/`))

