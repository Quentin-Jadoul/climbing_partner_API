// Import express
let express = require('express');

// Initialize the app
let app = express();

app.use(express.json());

let session = require('express-session');

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
}));

const Sequelize = require('sequelize');
const db = require('./database.js');

// Creating all the tables in the database
db.sync({alter: true}).then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
});

let router = require('./routes');
//setting middleware
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
// Send message for default URL
app.use('/', router)

// Setup server port
let port = process.env.NODE_PORT | 3000;
// Launch app to listen to specified port
app.listen(port, function () {
    console.log('Server running on port ' + port);
});