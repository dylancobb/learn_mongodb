'use strict';

const mongoose = require('mongoose'),
    Subscriber = require('../models/subscriber');

exports.getAllSubscribers = async (req, res, next) => {
    try {
        req.data = await Subscriber.find({});
        next();
    } catch (e) {
        next(e);
    }
}

exports.getSubscriptionPage = async (req, res, next) => {
    console.log(req.data);
    res.render('subscribers', { subscribers: req.data });
};

exports.saveSubscriber = async (req, res) => {
    const newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    try {
        await newSubscriber.save();
        res.render("thanks");
    } catch(e) {
        res.send(e);
    }
}