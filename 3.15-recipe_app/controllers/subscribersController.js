'use strict';

const mongoose = require('mongoose'),
    Subscriber = require('../models/subscriber');

exports.getAllSubscribers = async (req, res, next) => {
    try {
        req.data = await Subscriber.find({});
        next();
    } catch(e) {
        next(e);
    }
}