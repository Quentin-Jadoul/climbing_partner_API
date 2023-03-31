const db = require('./database.js');

// Creating all the tables in the database
db.sync({alter: true}).then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
});

// Import express
let express = require('express');
let session = require('express-session');
let router = require('./routes');
// Initialize the app
let app = express();
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
}));
// Send message for default URL
app.use('/', router)
// Setup server port
let port = 8000;
// Launch app to listen to specified port
app.listen(port, function () {
console.log('Server running on port ' + port);
});
//setting middleware
app.use(express.static('public'));
