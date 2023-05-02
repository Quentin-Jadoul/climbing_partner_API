const faker = require('faker');
const db = require('./database.js');

// Create 100 places
const NUM_PLACES = 100;

const generatePlaces = () => {
    const places = [];
    for (let i = 0; i < 100; i++) {
        let place = {
            name: faker.company.companyName(),
            location: faker.address.city(),
            type: faker.random.arrayElement['Indoor', 'Outdoor']
        };
        places.push(place);
    }
    return places;
};

const seedDatabase = async () => {
    try {
        await db.sync({ force: true }); // Drops existing tables and creates new ones
        const places = generatePlaces();
        await db.models.Place.bulkCreate(places); // Inserts fake data into the database
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};
    
seedDatabase();