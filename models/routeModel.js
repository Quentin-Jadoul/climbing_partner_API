const Sequelize = require('sequelize')
const sequelize = require('../database.js')

const Route = sequelize.define('route', {
    route_id: {
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
    grade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
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
module.exports = Route
