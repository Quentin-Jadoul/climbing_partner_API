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

// Retrieve a list of all places, as optionnal parameters you can specify the order, the limit and the offset, the type and search by location
exports.getPlaces = function(req, res) {
    const { limit, offset, type, location, sort } = req.query;

    // define where clause to filter by type and location
    const where = {};
    if (type) {
        where.type = type;
    }
    if (location) {
        where.location = { [Op.like]: `%${location}%` };
    }

    // define order clause to sort by name or location
    let order = [['name', 'ASC']];
    if (sort === 'location') {
        order = [['location', 'ASC']];
    }

    db.place.findAll({
        where,
        order,
        limit,
        offset
    })
    .then(function (places) {
        if (!places || places.length === 0) {
            return res.status(404).send({ message: "Places not found" });
        } else {
            return res.status(200).send(places);
        }
    })
    .catch(function (error) {
        return res.status(500).send({ message: "Error retrieving places", error });
    });
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
