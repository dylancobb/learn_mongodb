'use strict';

// require server and controller modules
const express = require('express'),
	app = express(),
	layouts = require('express-ejs-layouts'),
	homeController = require('./controllers/homeController'),
	errorController = require('./controllers/errorController');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(layouts);

// body parser
app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(express.json());
app.use(express.static('public'));

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

// handle routes
app.get('/', homeController.showIndex);
app.get('/courses', homeController.showCourses);
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

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
	console.log(`Server running at http://localhost:${ app.get('port') }`);
});
