const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'climbing_partner',
    'root',
    'root', {
        dialect: 'mysql',
        host: 'localhost'
    }
);
module.exports = sequelize