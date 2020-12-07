const { Sequelize } = require('sequelize');

const mySqlDB = new Sequelize('moreListings', 'root', 'sudoroot',
  {
    host: 'localhost',
    dialect: 'mariadb'
  }
);

const User = mySqlDB.define('User', {
  userName: Sequelize.STRING
});

const Favorite = mySqlDB.define('Favorite', {
  uID: Sequelize.INTEGER
});


const FavoriteList = mySqlDB.define('FavoriteList', {
  name: Sequelize.STRING,
  photoUrl: Sequelize.STRING,
  favID: Sequelize.INTEGER
});


const Listing = mySqlDB.define('Listing', {
  type: Sequelize.STRING,
  numOfBeds: Sequelize.INTEGER,
  photoUrl: Sequelize.STRING,
  superhost: Sequelize.BOOLEAN,
  rating: Sequelize.FLOAT,
  numOfRatings: Sequelize.INTEGER,
  description: Sequelize.STRING,
  price: Sequelize.FLOAT,
  favListID: Sequelize.INTEGER
});


const RelatedListing = mySqlDB.define('RelatedListing', {
  type: Sequelize.STRING,
  numOfBeds: Sequelize.INTEGER,
  photoUrl: Sequelize.STRING,
  superhost: Sequelize.BOOLEAN,
  rating: Sequelize.FLOAT,
  numOfRatings: Sequelize.INTEGER,
  description: Sequelize.STRING,
  price: Sequelize.FLOAT,
  listID: Sequelize.INTEGER
});

User.hasMany(Favorite);
Favorite.belongsTo(User);

Favorite.hasMany(FavoriteList);
FavoriteList.belongsTo(Favorite);

FavoriteList.hasMany(Listing);
Listing.belongsTo(FavoriteList);

Listing.hasMany(RelatedListing);
RelatedListing.belongsTo(Listing);

mySqlDB.sync();

module.exports = {
  mySqlDB,
  User,
  Favorite,
  FavoriteList,
  Listing,
  RelatedListing
};
// User.sync();
// Favorite.sync();
// FavoriteList.sync();
// Listing.sync();
// RelatedListing.sync();
/*

User
{
  user_name: String,
  favorites: Array // array of objects that look like below
}

Favorite
 favorite = {
 name: 'list name',
 photoUrl: 'photo url for the first listing in the list'
 listings: [*listing id's*]

Listing
 {
   listingId: 1,
   type: 'Entire house',
   numOfBeds: 3,
   photoUrl: 'somephotourl.com',
   superhost: true,
   favorite: false,
   rating: 4.5,
   numOfRatings: 56,
   description: 'a description of the place',
   price: 200,
 }


*/