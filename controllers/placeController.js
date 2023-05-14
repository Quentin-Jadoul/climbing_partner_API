const db = require('../models/index.js')
const { Op } = require("sequelize")

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
    const { sort, type, name, location, size, offset } = req.query

    const filters = {}
    const offset_int = Number(offset)
    const size_int = Number(size)
    // By default, order by name ASC
    let order = [['name', 'ASC']]
    if (sort) {
        switch (sort) {
            case 'name':
                order = [['name', 'ASC']]
                break
            case 'location':
                order = [['location', 'ASC']]
                break
            case 'type':
                order = [['type', 'ASC']]
                break
            default:
                order = [['name', 'ASC']]
        }
    }

    if (type) {
        filters.type = type
    }

    if (location) {
        filters.location = { [Op.like]: `%${location}%` }
    }
    if (name) {
        filters.name = { [Op.like]: `%${name}%` }
    }

    db.place.findAll({
        order,
        where: filters
    })
    .then(function (places) {
        if (!places) {
            return res.status(404).send({ message: "Places not found" });
        } else {
            if (size_int && size_int > 0) {
                if (offset_int && offset_int > 0) {
                    return res.status(200).send(places.slice(size_int * offset_int, size_int * offset_int + size_int));
                } else {
                    return res.status(200).send(places.slice(0, size_int));
                }
            }
            return res.status(200).send(places);
        }
    })
}

// Get the number of places
exports.getPlacesCount = function(req, res) {
    const { type, name, location } = req.query

    const filters = {}
    if (type) {
        filters.type = type
    }
    if (location) {
        filters.location = { [Op.like]: `%${location}%` }
    }
    if (name) {
        filters.name = { [Op.like]: `%${name}%` }
    }
    db.place.count({
        where: filters
    })
    .then(function (count) {
        return res.status(200).send({ count });
    })
}

// Retrieve the names and ids of all places
exports.getPlacesNames = function(req, res) {
    db.place.findAll({
        attributes: ['place_id', 'name'],
        order: [['name', 'ASC']]
    })
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
