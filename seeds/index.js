const Campground = require('../models/campground')
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/yelp-camp');
mongoose.connect('mongodb+srv://first_user:iolbMc7f5IpRjsAa@cluster0.zgego.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '626b5cf0f2b86b395901ec39',
            // author: 'first_user',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque eligendi expedita voluptatum, omnis ducimus obcaecati ut, magnam cum beatae dolore, quaerat praesentium eum? Reiciendis excepturi, aliquid soluta modi repellendus voluptatum.",
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [ 
                cities[random1000].longitude, 
                cities[random1000].latitude
              ] 
            },
            images: [
              {
                url: 'https://res.cloudinary.com/diqwgraiy/image/upload/v1651857849/YelpCamp/v7nwndnbauzbzlo3rjfc.jpg',
                filename: 'YelpCamp/v7nwndnbauzbzlo3rjfc',
              },
              {
                url: 'https://res.cloudinary.com/diqwgraiy/image/upload/v1651857853/YelpCamp/ap3wgflrwx7iqod4bail.jpg',
                filename: 'YelpCamp/ap3wgflrwx7iqod4bail',
              }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
