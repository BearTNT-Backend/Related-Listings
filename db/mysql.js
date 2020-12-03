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
  name: Sequelize.STRING,
  photoUrl: Sequelize.STRING
});

User.hasMany(Favorite);
Favorite.belongsTo(User);

const Listing = mySqlDB.define('Listing', {
  listingId: Sequelize.INTEGER,
  type: Sequelize.STRING,
  numOfBeds: Sequelize.INTEGER,
  photoUrl: Sequelize.STRING,
  superhost: Sequelize.BOOLEAN,
  favorite: Sequelize.BOOLEAN,
  rating: Sequelize.FLOAT,
  numOfRatings: Sequelize.INTEGER,
  description: Sequelize.STRING,
  price: Sequelize.FLOAT,
});

Favorite.hasMany(Listing);
Listing.belongsTo(Favorite);

User.sync();
Favorite.sync();
Listing.sync();
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