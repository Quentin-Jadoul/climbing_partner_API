const faker = require('faker');
const db = require('./database.js');
const Place = require('./models/placeModel.js');
const User = require('./models/userModel.js');
const Boulder = require('./models/boulderModel.js');
const Activity = require('./models/activityModel.js');
const Climb = require('./models/climbModel.js');

// Create 100 places
const NUM_PLACES = 100;

const generatePlaces = () => {
    const places = [];
    for (let i = 0; i < 100; i++) {
        let place = {
            name: faker.company.companyName(),
            location: faker.address.city(),
            type: faker.random.arrayElement(['indoor', 'outdoor'])
        };
        places.push(place);
    }
    return places;
};

// // Create 100 users
// const NUM_USERS = 100;

// const generateUsers = () => {
//     const users = [];
//     for (let i = 0; i < 100; i++) {
//         let user = {
//             username: faker.internet.userName(),
//             email: faker.internet.email(),
//             password: faker.internet.password(),
//             firstname: faker.name.firstName(),
//             lastname: faker.name.lastName()
//         };
//         users.push(user);
//     }
//     return users;
// };

const seedDatabase = async () => {
    try {
        await db.sync({ alter: true });
        const places = generatePlaces();
        console.log(places[0]);
        await Place.bulkCreate(places); // Inserts fake data into the database
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};
    
seedDatabase();