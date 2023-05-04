const db = require('../models/index.js')
const { Op } = require("sequelize")

const GRADE_VALUES = {
    '3': 1,
    '3+': 2,
    '4': 3,
    '4+': 4,
    '5': 5,
    '5+': 6,
    '6A': 7,
    '6A+': 8,
    '6B': 9,
    '6B+': 10,
    '6C': 11,
    '6C+': 12,
    '7A': 13,
    '7A+': 14,
    '7B': 15,
    '7B+': 16,
    '7C': 17,
    '7C+': 18,
    '8A': 19,
    '8A+': 20,
    '8B': 21,
    '8B+': 22,
    '8C': 23,
    '8C+': 24,
    '9A': 25,
  };

// Add a new boulder
exports.createBoulder = function(req, res) {
    db.place.findOne({
        where: {
            place_id: req.body.place_id
        }
    })
    .then(function (place) {
        if (place) {
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
        } else {
            return res.status(404).send({ message: "Place not found" });
        }
    })
}

// Retrieve a list of all boulders
exports.getBoulders = function(req, res) {
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
    const { sort, type, minGrade, maxGrade, status, size, offset } = req.query

    const minGradeValue = GRADE_VALUES[minGrade]
    const maxGradeValue = GRADE_VALUES[maxGrade]

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
            case 'grade':
                order = [['grade', 'ASC']]
                break
            case 'type':
                order = [['type', 'ASC']]
                break
            case 'status':
                order = [['status', 'ASC']]
                break
            default:
                order = [['name', 'ASC']]
                break
        }
    }
    if (type) {
        filters.type = type
    }
    if (status) {
        filters.status = status
    }
    if (minGradeValue && maxGradeValue) {
        filters.grade = { [Op.between]: [minGradeValue, maxGradeValue] }
    } else {
        if (minGradeValue) {
            filters.grade = { [Op.gte]: minGradeValue }
        }
        if (maxGradeValue) {
            filters.grade = { [Op.lte]: maxGradeValue }
        }
    }
    db.boulder.findAll({
        where: {
            place_id: req.params.id,
            ...filters
        }
    })
    .then(function (boulders) {
        if (!boulders) {
            return res.status(404).send({ message: "Boulders not found" });
        } else {
            if (size_int && size_int > 0) {
                if (offset_int && offset_int > 0) {
                    return res.status(200).send(boulders.slice(size_int * offset_int, size_int * offset_int + size_int));
                } else {
                    return res.status(200).send(boulders.slice(0, size_int));
                }
            }
            return res.status(200).send(boulders);
        }
    })
}

// Get the number of boulders by place_id
exports.getBouldersCountByPlace = function(req, res) {
    const { type, minGrade, maxGrade, status } = req.query

    const minGradeValue = GRADE_VALUES[minGrade]
    const maxGradeValue = GRADE_VALUES[maxGrade]

    const filters = {}
    if (type) {
        filters.type = type
    }
    if (status) {
        filters.status = status
    }
    if (minGradeValue && maxGradeValue) {
        filters.grade = { [Op.between]: [minGradeValue, maxGradeValue] }
    } else {
        if (minGradeValue) {
            filters.grade = { [Op.gte]: minGradeValue }
        }
        if (maxGradeValue) {
            filters.grade = { [Op.lte]: maxGradeValue }
        }
    }
    db.boulder.count({
        where: {
            place_id: req.params.id,
            ...filters
        }
    })
    .then(function (count) {
        return res.status(200).send({ count });
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
    db.place.findOne({
        where: {
            place_id: req.body.place_id
        }
    })
    .then(function (place) {
        if (place) {
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
        } else {
            return res.status(404).send({ message: "Place not found" });
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