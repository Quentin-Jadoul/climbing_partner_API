const db = require('../models/index.js')

// Add a new activity
exports.createActivity = function(req, res) {
    db.user.findOne({
        where: {
            user_id: req.body.user_id
        },
        include:
        {   
            model: db.user,
            attributes: ['username', 'firstname', 'lastname']
        }
    })
    .then(function (user) {
        if (user) {
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
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    })
}

// Retrieve a list of all activities
exports.getActivities = function(req, res) {
    const { size, offset } = req.query

    let order = [['date', 'DESC']]

    const offset_int = Number(offset)
    const size_int = Number(size)

    db.activity.findAll(
        { 
            order,
            include:
            {   
                model: db.user,
                attributes: ['username', 'firstname', 'lastname']
            }
        }
    )
    .then(function (activities) {
        if (!activities) {
            return res.status(404).send({ message: "Activities not found" });
        } else {
            if (size_int && size_int > 0) {
                if (offset_int && offset_int > 0) {
                    return res.status(200).send(activities.slice(size_int * offset_int, size_int * offset_int + size_int));
                } else {
                    return res.status(200).send(activities.slice(0, size_int));
                }
            }
            return res.status(200).send(activities);
        }
    })
}

exports.getActivitiesCount = function(req, res) {
    if (req.query.user_id) {
        db.activity.count({
            where: {
                user_id: req.query.user_id
            }
        })
        .then(function (count) {
            return res.status(200).send({ count });
        })
    } else {
        db.activity.count()
        .then(function (count) {
            return res.status(200).send({ count });
        })
    }
}

// Retrieve a list of all activities by user_id
exports.getActivitiesByUser = function(req, res) {
    const { size, offset, user_id } = req.query

    let order = [['date', 'DESC']]

    const offset_int = Number(offset)
    const size_int = Number(size)

    db.activity.findAll({
        order,
        where: {
            user_id: user_id
        },
        include:
        {   
            model: db.user,
            attributes: ['username', 'firstname', 'lastname']
        }
    })
    .then(function (activities) {
        if (!activities) {
            return res.status(404).send({ message: "Activities not found" });
        } else {
            if (size_int && size_int > 0) {
                if (offset_int && offset_int > 0) {
                    return res.status(200).send(activities.slice(size_int * offset_int, size_int * offset_int + size_int));
                } else {
                    return res.status(200).send(activities.slice(0, size_int));
                }
            }
            return res.status(200).send(activities);
        }
    })
}

// Retrieve a single activity by id
exports.getActivity = function(req, res) {
    db.activity.findOne({
        where: {
            activity_id: req.params.id
        },
        include: {   
            model: db.user,
            attributes: ['username', 'firstname', 'lastname']
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
    db.user.findOne({
        where: {
            user_id: req.body.user_id
        }
    })
    .then(function (user) {
        if (user) {
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
        } else {
            return res.status(404).send({ message: "User not found" });
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
            return res.status(200).send({ message: "Activity deleted" });
        }
    })
}

