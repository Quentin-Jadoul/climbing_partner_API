const db = require('../models/index.js')

const jwt = require('jsonwebtoken')
const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300


// Create a user
exports.createUser = async function(req, res) {
    try {
      const usernameAvailable = await isUsernameAvailable(req.body.username);
      const emailAvailable = await isEmailAvailable(req.body.email);
  
      if (usernameAvailable && emailAvailable) {
        const user = await db.user.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname
        });
  
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        } else {
          return res.status(200).send(user);
        }
      } else if (!usernameAvailable && !emailAvailable) {
        return res.status(409).send({ message: "Username and email already exist" , usernameAvailable: usernameAvailable, emailAvailable: emailAvailable});
      } else if (!usernameAvailable) {
        return res.status(409).send({ message: "Username already exists", usernameAvailable: usernameAvailable, emailAvailable: emailAvailable });
      } else if (!emailAvailable) {
        return res.status(409).send({ message: "Email already exists", usernameAvailable: usernameAvailable, emailAvailable: emailAvailable });
      }
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }

function isEmailAvailable(email) {
    return new Promise((resolve, reject) => {
        db.user.findOne({
            where: {
                email: email
            }
        })
        .then((user) => {
            if (!user) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function isUsernameAvailable(username) {
    return new Promise((resolve, reject) => {
      db.user.findOne({
        where: {
          username: username
        }
      })
      .then((user) => {
        if (!user) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
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