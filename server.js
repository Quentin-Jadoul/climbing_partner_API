const express = require('express');
const cors = require('cors');
const session = require('express-session');
const Sequelize = require('sequelize');
const db = require('./database.js');
const router = require('./routes');

// Initialize the app
let app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/', router)

// Sync the db
db.sync({alter: true}).then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
});

// Setup server port
let port = process.env.NODE_PORT | 3000;

// Start server
app.listen(port, function () {
    console.log('Server running on port ' + port);
});