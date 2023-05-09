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

// Create 1000 boulders
const NUM_BOULDERS = 1000;

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

const generateBoulders = () => {
    const boulders = [];
    for (let i = 0; i < 1000; i++) {
        let grade = faker.random.arrayElement(['3', '3+', '4', '4+', '5', '5+', '6A', '6A+', '6B', '6B+', '6C', '6C+', '7A', '7A+', '7B', '7B+', '7C', '7C+', '8A', '8A+', '8B', '8B+', '8C', '8C+', '9A']);
        let boulder = {
            name: faker.random.words(),
            grade: grade,
            grade_int: GRADE_VALUES[grade],
            status: faker.random.boolean(),
            type: faker.random.arrayElement(['slab', 'vertical', 'overhang', 'roof']),
            // we need to add the place_id from existing places
            place_id: faker.random.number({ min: 1, max: 100 }),
        };
        boulders.push(boulder);
    }
    return boulders;
};

// Create 100 climbs
const NUM_CLIMBS = 100;

const generateClimbs = () => {
    const climbs = [];
    for (let i = 0; i < 100; i++) {
        let climb = {
            nb_attempts: faker.random.number({ min: 1, max: 10 }),
            nb_success: faker.random.number({ min: 1, max: 10 }),
            style: faker.random.arrayElement(['flash', 'redpoint', 'onsight', 'repeat', 'attempt']),
            // we need to add the boulder_id from existing boulders
            boulder_id: faker.random.number({ min: 1, max: 1000 }),
            // we need to add the user_id from existing users
            activity_id: faker.random.number({ min: 1, max: 100 }),
        };
        climbs.push(climb);
    }
    return climbs;
};

// Create 100 activities
const NUM_ACTIVITIES = 100;

const generateActivities = () => {
    const activities = [];
    for (let i = 0; i < 100; i++) {
        let activity = {
            name: faker.random.words(),
            description: faker.lorem.paragraph(),
            // we need to add the user_id from existing users
            user_id: faker.random.number({ min: 1, max: 3 }),
            date: faker.date.past(),
            duration: faker.random.number({ min: 10, max: 240 }),
        };
        activities.push(activity);
    }
    return activities;
};

const seedDatabase = async () => {
    try {
        // we drop the database if it already exists
        await db.drop();
        // we create the database schema
        await db.sync({ alter: true });
        const places = generatePlaces();
        const boulders = generateBoulders();
        const climbs = generateClimbs();
        const activities = generateActivities();
        await Place.bulkCreate(places); // Inserts fake data into the database
        await Boulder.bulkCreate(boulders); // Inserts fake data into the database
        await Activity.bulkCreate(activities); // Inserts fake data into the database
        await Climb.bulkCreate(climbs); // Inserts fake data into the database
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};
    
seedDatabase();