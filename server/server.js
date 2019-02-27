const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');

const PORT = process.env.PORT || 3000;
const api = require('./routes/api')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname + '/myApp/dist/myApp'));
app.use(express.static(path.join(__dirname, "js")));

app.use('/api', api)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/myApp/dist/myApp/index.html'));
});

app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT)
})