const db = require('../models/index.js')

const jwt = require('jsonwebtoken')
const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300


// Create a user
exports.createUser = function(req, res) {
    db.user.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    .then(function (user) {
        if (isUsernameAvailable(user.username) && isEmailAvailable(user.email)) {
            return res.status(201).send(user);
        } else {
            if (!isUsernameAvailable(user.username) && !isEmailAvailable(user.email)) {
                return res.status(409).send({ error: "Username and email already in use", usernameTaken: true, emailTaken: true });
            } else if (!isUsernameAvailable(user.username)) {
                return res.status(409).send({ error: "Username already in use", usernameTaken: true, emailTaken: false });
            } else {
                return res.status(409).send({ error: "Email already in use", usernameTaken: false, emailTaken: true });
            }
        }
    })
}

isUsernameAvailable = function(username) {
    db.user.findOne({
        where: {
            username: username
        }
    })
    .then(function (user) {
        if (!user) {
            return true;
        } else {
            return false;
        }
    })
}

isEmailAvailable = function(email) {
    db.user.findOne({
        where: {
            email: email
        }
    })
    .then(function (user) {
        if (!user) {
            return true;
        } else {
            return false;
        }
    })
}

// Get all users
exports.getUsers = function(req, res) {
    db.user.findAll()
    .then(function (users) {
        if (!users) {
            return res.status(404).send({ message: "Users not found" });
        } else {
            return res.status(200).send(users);
        }
    })
}

// Get a user by id
exports.getUser = function(req, res) {
    db.user.findOne({
        where: {
            user_id: req.params.id
        }
    })
    .then(function (user) {
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        } else {
            return res.status(200).send(user);
        }
    })
}

// Update a user by id
exports.updateUser = function(req, res) {
    db.user.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }, {
        where: {
            user_id: req.params.id
        }
    })
    .then(function (user) {
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        } else {
            return res.status(200).send(user);
        }
    })
}

// Delete a user by id
exports.deleteUser = function(req, res) {
    db.user.destroy({
        where: {
            user_id: req.params.id
        }
    })
    .then(function (user) {
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        } else {
            return res.sendStatus(200);
        }
    })
}

// Login a user
exports.loginUser = function(req, res) {
    db.user.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    .then(function (user) {
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        } else {
            const token = jwt.sign({ user_id: user.user_id }, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })
            return res.status(200).send({ token: token });
        }
    })
}