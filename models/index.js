const Sequelize = require('sequelize')
const sequelize = require('../database.js')

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./userModel.js')
db.boulder = require('./boulderModel.js')
db.activity = require('./activityModel.js')
db.climb = require('./climbModel.js')
db.place = require('./placeModel.js')

// Relations
db.user.hasMany(db.activity, { foreignKey: 'user_id', sourceKey: 'user_id' })
db.activity.belongsTo(db.user, { foreignKey: 'user_id', targetKey: 'user_id' })

db.place.hasMany(db.boulder, { foreignKey: 'place_id', sourceKey: 'place_id' })
db.boulder.belongsTo(db.place, { foreignKey: 'place_id', targetKey: 'place_id' })

db.activity.hasMany(db.climb, { foreignKey: 'activity_id', sourceKey: 'activity_id' })
db.climb.belongsTo(db.activity, { foreignKey: 'activity_id', targetKey: 'activity_id' })

db.boulder.hasMany(db.climb, { foreignKey: 'boulder_id', sourceKey: 'boulder_id' })
db.climb.belongsTo(db.boulder, { foreignKey: 'boulder_id', targetKey: 'boulder_id' })

module.exports = db