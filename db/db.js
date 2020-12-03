const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/beartnt', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});



const listingSchema = new mongoose.Schema({
  lId: {type: Number, unique: true},
  relatedListings: Array
});

// each related listing in the related listings array will look like this:
// realted = {
//   id: Number, // for adding to favorites
//   type: String, // eg., house, appartment, condo
//   numOfBeds: Number,
//   photo_url: String,
//   superhost: Boolean,
//   rating: Number, // if 0 new listing or no ratings
//   num_of_ratings: Number, // if 0 new listing or no ratings
//   description: String,
//   price: Number
//   }

const userSchema = new mongoose.Schema({
  uId: {type: Number, unique: true},
  favorites: Array
});

// each list in the array of favorites will look like this:
// favorite = {
//   name: 'list name',
//   photoUrl: 'photo url for the first listing in the list'
//   listings: [/*listing id's*/]
//  }


const Listing = mongoose.model('Listing', listingSchema);
const User = mongoose.model('User', userSchema);

module.exports.con = mongoose.connection;
module.exports.Listing = Listing;
module.exports.User = User;

