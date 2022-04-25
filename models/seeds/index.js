
const Campground = require('../models/campground')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!!!");
        console.log(err);
    })

const seedDB = async() => {
    await Campground.deleteMany({});
    const c = new Campground({title: 'purple field'});
    await c.save();
}

seedDB();