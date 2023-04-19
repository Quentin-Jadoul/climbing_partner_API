const db = require('../models/index.js')

// Add a new activity
exports.createActivity = function(req, res) {
    db.activity.create({
        name: req.body.name,
        description: req.body.description,
        user_id: req.body.user_id,
        date: req.body.date,
        duration: req.body.duration
    })
    .then(function (activity) {
        if (!activity) {
            return res.status(404).send({ message: "Activity not found" });
        } else {
            return res.status(200).send(activity);
        }
    })
}

// Retrieve a list of all activities
exports.getActivities = function(req, res) {
    db.activity.findAll()
    .then(function (activities) {
        if (!activities) {
            return res.status(404).send({ message: "Activities not found" });
        } else {
            return res.status(200).send(activities);
        }
    })
}

// Retrieve a list of all activities by user_id
exports.getActivitiesByUser = function(req, res) {
    db.activity.findAll({
        where: {
            user_id: req.params.id
        }
    })
    .then(function (activities) {
        if (!activities) {
            return res.status(404).send({ message: "Activities not found" });
        } else {
            return res.status(200).send(activities);
        }
    })
}

// Retrieve a single activity by id
exports.getActivity = function(req, res) {
    db.activity.findOne({
        where: {
            activity_id: req.params.id
        }
    })
    .then(function (activity) {
        if (!activity) {
            return res.status(404).send({ message: "Activity not found" });
        } else {
            return res.status(200).send(activity);
        }
    })
}

// Update a activity by id
exports.updateActivity = function(req, res) {
    db.activity.update({
        name: req.body.name,
        description: req.body.description,
        user_id: req.body.user_id,
        date: req.body.date,
        duration: req.body.duration,
    }, {
        where: {
            activity_id: req.params.id
        }
    })
    .then(function (activity) {
        if (!activity) {
            return res.status(404).send({ message: "Activity not found" });
        } else {
            return res.status(200).send(activity);
        }
    })
}

// Delete a activity by id
exports.deleteActivity = function(req, res) {
    db.activity.destroy({
        where: {
            activity_id: req.params.id
        }
    })
    .then(function (activity) {
        if (!activity) {
            return res.status(404).send({ message: "Activity not found" });
        } else {
            return res.sendStatus(200);
        }
    })
}

