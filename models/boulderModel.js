const Sequelize = require('sequelize')
const sequelize = require('../database.js')

const Boulder = sequelize.define('boulder', {
    boulder_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    grade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    place_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: true
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
module.exports = Boulder
