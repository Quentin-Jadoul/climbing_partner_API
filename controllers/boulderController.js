const db = require('../models/index.js')

// Add a new boulder
exports.createBoulder = function(req, res) {
    db.boulder.create({
        name: req.body.name,
        place_id: req.body.place_id,
        grade: req.body.grade,
        status: req.body.status,
        type: req.body.type,
        image: req.body.image
    })
    .then(function (boulder) {
        if (!boulder) {
            return res.status(404).send({ message: "Boulder not found" });
        } else {
            return res.status(200).send(boulder);
        }
    })
}

// Retrieve a list of all boulders
exports.getBoulders = function(req, res) {
    console.log("test")
    db.boulder.findAll()
    .then(function (boulders) {
        if (!boulders) {
            return res.status(404).send({ message: "Boulders not found" });
        } else {
            return res.status(200).send(boulders);
        }
    })
}

// Retrieve a list of all boulders by place_id
exports.getBouldersByPlace = function(req, res) {
    console.log(req.params.id)
    db.boulder.findAll({
        where: {
            place_id: req.params.id
        }
    })
    .then(function (boulders) {
        if (!boulders) {
            return res.status(404).send({ message: "Boulders not found" });
        } else {
            return res.status(200).send(boulders);
        }
    })
}

// Retrieve a single boulder by id
exports.getBoulder = function(req, res) {
    console.log(req.params.id)
    db.boulder.findOne({
        where: {
            boulder_id: req.params.id
        }
    })
    .then(function (boulder) {
        if (!boulder) {
            return res.status(404).send({ message: "Boulder not found" });
        } else {
            return res.status(200).send(boulder);
        }
    })
}

// Update a boulder by id
exports.updateBoulder = function(req, res) {
    db.boulder.update({
        name: req.body.name,
        location: req.body.location,
        grade: req.body.grade,
        description: req.body.description,
        status: req.body.status,
        type: req.body.type,
        image: req.body.image
    }, {
        where: {
            boulder_id: req.params.id
        }
    })
    .then(function (boulder) {
        if (!boulder) {
            return res.status(404).send({ message: "Boulder not found" });
        } else {
            return res.status(200).send(boulder);
        }
    })
}

// Delete a boulder by id
exports.deleteBoulder = function(req, res) {
    db.boulder.destroy({
        where: {
            boulder_id: req.params.id
        }
    })
    .then(function (boulder) {
        if (!boulder) {
            return res.status(404).send({ message: "Boulder not found" });
        } else {
            return res.sendStatus(200);
        }
    })
}