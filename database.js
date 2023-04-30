const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize(
//     'climbing_partner',
//     'root',
//     'root', {
//         dialect: 'mysql',
//         dialectOptions: {
//             host: 'localhost',
//     }}
// );

const sequelize = new Sequelize(
    'climbing_partner',
    'quentin',
    'quentin', {
        dialect: 'mysql',
        dialectOptions: {
            host: 'localhost'
    }}
);

// check the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize