const Sequelize = require('sequelize')
const sequelize = require('../database.js')

const User = require('./userModel.js')
const Route = require('./routeModel.js')
const Activity = require('./activityModel.js')

// Associations
User.hasMany(Activity, {foreignKey: 'user_id'})
Activity.belongsTo(User, {foreignKey: 'user_id'})
Route.belongsToMany(Activity, {foreignKey: 'routes_ids'})