'use strict';

const express = require('express'),
    app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

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
const subscribersController = require('./controllers/subscribersController');

app.get('/subscribers', subscribersController.getAllSubscribers,
    (req, res, next) => {
        console.log(req.data);
        res.render('subscribers', { subscribers: req.data });
    });

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${ app.get('port') }`);
});