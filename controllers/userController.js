const db = require('../models/index.js')

exports.createUser = function(req, res) {
    db.user.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    .then(function (user) {
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        } else {
            return res.status(200).send(user);
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