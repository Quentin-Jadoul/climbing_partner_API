const db = require('../models/index.js')

// Add a new climb
exports.createClimb = function(req, res) {
    db.boulder.findOne({
        where: {
            boulder_id: req.body.boulder_id
        }
    })
    .then(function (boulder) {
        if (boulder) {
            db.activity.findOne({
                where: {
                    activity_id: req.body.activity_id
                }
            })
            .then(function (activity) {
                if (activity) {
                    db.climb.create({
                        nb_attempts: req.body.nb_attempts,
                        style: req.body.style,
                        boulder_id: req.body.boulder_id,
                        activity_id: req.body.activity_id,
                    })
                    .then(function (climb) {
                        if (!climb) {
                            return res.status(404).send({ message: "Climb not found" });
                        } else {
                            return res.status(200).send(climb);
                        }
                    })
                } else {
                    return res.status(404).send({ message: "Activity not found" });
                }
            })
        } else {
            return res.status(404).send({ message: "Boulder not found" });
        }
    })
}

// Retrieve a list of all climbs
exports.getClimbs = function(req, res) {
    db.climb.findAll({
        include: {
            model: db.boulder,
            attributes: ['place_id', 'grade', 'grade_int']
        }
    })
    .then(function (climbs) {
        if (!climbs) {
            return res.status(404).send({ message: "Climbs not found" });
        } else {
            return res.status(200).send(climbs);
        }
    })
}

// Retrieve a list of all climbs by activity id
exports.getClimbsByActivity = function(req, res) {
    db.climb.findAll({
        where: {
            activity_id: req.params.id
        },
        include: {
            model: db.boulder,
            attributes: ['place_id', 'grade', 'grade_int']
        }
    })
    .then(function (climbs) {
        if (!climbs) {
            return res.status(404).send({ message: "Climbs not found" });
        } else {
            return res.status(200).send(climbs);
        }
    })
}

// Retrieve a list of all climbs by boulder id
exports.getClimbsByBoulder = function(req, res) {
    db.climb.findAll({
        where: {
            boulder_id: req.params.id
        }
    })
    .then(function (climbs) {
        if (!climbs) {
            return res.status(404).send({ message: "Climbs not found" });
        } else {
            return res.status(200).send(climbs);
        }
    })
}

// Retrieve a single climb by id
exports.getClimb = function(req, res) {
    db.climb.findOne({
        where: {
            climb_id: req.params.id
        },
        include: {
            model: db.boulder,
            attributes: ['place_id', 'grade', 'grade_int']
        }
    })
    .then(function (climb) {
        if (!climb) {
            return res.status(404).send({ message: "Climb not found" });
        } else {
            return res.status(200).send(climb);
        }
    })
}

// Update a climb by id
exports.updateClimb = function(req, res) {
    db.boulder.findOne({
        where: {
            boulder_id: req.body.boulder_id
        }
    })
    .then(function (boulder) {
        if (boulder) {
            db.activity.findOne({
                where: {
                    activity_id: req.body.activity_id
                }
            })
            .then(function (activity) {
                if (activity) {
                    db.climb.update({
                        nb_attempts: req.body.nb_attempts,
                        style: req.body.style,
                        boulder_id: req.body.boulder_id,
                        activity_id: req.body.activity_id,
                    }, {
                        where: {
                            climb_id: req.params.id
                        }
                    })
                    .then(function (climb) {
                        if (!climb) {
                            return res.status(404).send({ message: "Climb not found" });
                        } else {
                            return res.status(200).send(climb);
                        }
                    })
                } else {
                    return res.status(404).send({ message: "Activity not found" });
                }
            })
        } else {
            return res.status(404).send({ message: "Boulder not found" });
        }
    })
}

// Delete a climb by id
exports.deleteClimb = function(req, res) {
    db.climb.destroy({
        where: {
            climb_id: req.params.id
        }
    })
    .then(function (climb) {
        if (!climb) {
            return res.status(404).send({ message: "Climb not found" });
        } else {
            return res.sendStatus(200);
        }
    })
}
