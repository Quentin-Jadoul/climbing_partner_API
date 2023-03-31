const Sequelize = require('sequelize')
const sequelize = require('../database.js')

const Activity = sequelize.define('activity', {
    activity_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    routes_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {tableName: 'activities'})
module.exports = Activity

