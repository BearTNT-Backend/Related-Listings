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
