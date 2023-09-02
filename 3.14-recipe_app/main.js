'use strict';

const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://localhost:27017/recipe_db',
    { useNewUrlParser: true }
);
const db = mongoose.connection;
db.once("open", () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

const Subscriber = require('./models/subscriber');

async function run() {

    const subscriber1 = new Subscriber({
        name: "Jon Wexler",
        email: "jon@jonwexler.com"
    });

    try {
        await subscriber1.save();
    } catch (err) {
        console.error(err);
    }

    try {
        await Subscriber.create({
            name: "Dylan Cobb",
            email: "dylancobb92@gmail.com"
        });
    } catch (err) {
        console.error(error);
    }
}
run().catch(console.error);

async function query() {
    const myQuery = Subscriber.where({
        name: "Jon Wexler"
    });

    try {
       const result = await myQuery.findOne();
       console.log(result);
    } catch(err) {
        console.error(err);
    }
};
query().catch(console.error);