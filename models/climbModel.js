const Sequelize = require('sequelize')
const sequelize = require('../database.js')

const Climb = sequelize.define('climb', {
    climb_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nb_attempts: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    style: {
        type: Sequelize.STRING,
        allowNull: false
    },
    boulder_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false
    },
    activity_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
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
})
module.exports = Climb
