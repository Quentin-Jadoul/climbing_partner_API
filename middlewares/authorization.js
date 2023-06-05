const db = require('../models/index.js')

const jwt = require('jsonwebtoken')
const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 3000

// Login a user
exports.login = function(req, res) {
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
            return res.status(200).send({ token: token , user_id: user.user_id});
        }
    })
}

// Authenticate a user
exports.isAuthorized = function(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, jwtKey, (err, data) => {
            if (err) {
                return res.status(403).send({ message: "Not authorized" });
            }
            req.user = data;
            return next();
        });
    } else {
        return res.status(403).send({ message: "Not authorized" });
    }
}