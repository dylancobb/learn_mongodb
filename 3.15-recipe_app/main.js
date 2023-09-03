'use strict';

// set up server
const express = require('express'),
    app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

// body-parser
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

// connect to database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(
    'mongodb://localhost:27017/recipe_db',
    { useNewUrlParser: true }
);
const db = mongoose.connection;
db.once("open", () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

// handle subscribers GET request
const subscribersController = require('./controllers/subscribersController');
app.get(
    '/subscribers',
    subscribersController.getAllSubscribers
);

// handle contact GET request
app.get('/contact', (req, res, next) => {
    res.render('contact');
});

// handle form submission (action is to '/subscribe')
app.post('/subscribe', subscribersController.saveSubscriber);

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}`);
});