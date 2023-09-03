'use strict';

const mongoose = require('mongoose'),
    Subscriber = require('../models/subscriber');

exports.getAllSubscribers = async (req, res) => {
    try {
      const subscribers = await Subscriber.find({}).exec();
      res.render("subscribers", {
        subscribers: subscribers
      });
      console.log("promise complete");
    } catch (error) {
      console.log(error.message);
      res.render("subscribers", {
        subscribers: []
      });
    }
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