const Campground = require('../models/campground')
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '626b5cf0f2b86b395901ec39',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque eligendi expedita voluptatum, omnis ducimus obcaecati ut, magnam cum beatae dolore, quaerat praesentium eum? Reiciendis excepturi, aliquid soluta modi repellendus voluptatum.",
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/diqwgraiy/image/upload/v1651376619/YelpCamp/qjpjl0kzotpe98yizvaz.jpg',
                  filename: 'YelpCamp/qjpjl0kzotpe98yizvaz',
                },
                {
                  url: 'https://res.cloudinary.com/diqwgraiy/image/upload/v1651376621/YelpCamp/svhafgpf4iuuzom3k88h.jpg',
                  filename: 'YelpCamp/svhafgpf4iuuzom3k88h',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});