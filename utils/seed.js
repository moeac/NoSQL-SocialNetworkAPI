const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUsername, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected son");

    // drop existing users
    await User.deleteMany({});
    
    // drop existing thoughts
    await Thought.deleteMany({});
    
    const users = [];

    const thoughts = getRandomThoughts(15);

    // loop 5 times to add 5 random users to the array
    for (let i = 0; i < 5; i++) {
        const username = getRandomUsername();
        const email = `${username}@msn.com`

        users.push({
            username,
            email
        })
    }
    
    // add users to the collection and await results 
    await User.collection.insertMany(users);
    
    // add thoughts to the collection and await results
    await Thought.collection.insertMany(thoughts);
    
    // log out the seed data to indicate what should appear in the database
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);

});