const db = require('../models/index.js')

// Add a new place
exports.createPlace = function(req, res) {
    db.place.create({
        name: req.body.name,
        location: req.body.location,
        type: req.body.type,
    })
    .then(function (place) {
        if (!place) {
            return res.status(404).send({ message: "Place not found" });
        } else {
            return res.status(200).send(place);
        }
    })
}

// Retrieve a list of all places
exports.getPlaces = function(req, res) {
    db.place.findAll()
    .then(function (places) {
        if (!places) {
            return res.status(404).send({ message: "Places not found" });
        } else {
            return res.status(200).send(places);
        }
    })
}

// Retrieve a single place by id
exports.getPlace = function(req, res) {
    db.place.findOne({
        where: {
            place_id: req.params.id
        }
    })
    .then(function (place) {
        if (!place) {
            return res.status(404).send({ message: "Place not found" });
        } else {
            return res.status(200).send(place);
        }
    })
}

// Update a place by id
exports.updatePlace = function(req, res) {
    db.place.update({
        name: req.body.name,
        location: req.body.location,
        type: req.body.type,
    }, {
        where: {
            place_id: req.params.id
        }
    })
    .then(function (place) {
        if (!place) {
            return res.status(404).send({ message: "Place not found" });
        } else {
            return res.status(200).send(place);
        }
    })
}

// Delete a place by id
exports.deletePlace = function(req, res) {
    db.place.destroy({
        where: {
            place_id: req.params.id
        }
    })
    .then(function (place) {
        if (!place) {
            return res.status(404).send({ message: "Place not found" });
        } else {
            return res.sendStatus(200);
        }
    })
}
