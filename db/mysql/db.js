// This requires a database called moreListings to already be
//   in MySQL or MariaDB
// If using MySQL, change dialect on line 10 to MySQL
// You will also need to change the username and password on line 8
//   'root' and 'sudoroot' currently

const { Sequelize } = require('sequelize');

const db = new Sequelize('moreListings', 'root', 'sudoroot',
  {
    host: 'localhost',
    dialect: 'mariadb'
  }
);

const User = db.define('User', {
  userName: Sequelize.STRING
});

const Favorite = db.define('Favorite', {
  uID: Sequelize.INTEGER,
  listID: Sequelize.INTEGER
});


const FavoriteList = db.define('FavoriteList', {
  name: Sequelize.STRING,
  photoUrl: Sequelize.STRING,
  favID: Sequelize.INTEGER,
  uID: Sequelize.INTEGER
});


const Listing = db.define('Listing', {
  type: Sequelize.STRING,
  numOfBeds: Sequelize.INTEGER,
  photoUrl: Sequelize.STRING,
  superhost: Sequelize.BOOLEAN,
  favorite: Sequelize.BOOLEAN,
  rating: Sequelize.FLOAT,
  numOfRatings: Sequelize.INTEGER,
  description: Sequelize.STRING,
  price: Sequelize.FLOAT,
  favListID: Sequelize.INTEGER
});


const RelatedListing = db.define('RelatedListing', {
  type: Sequelize.STRING,
  numOfBeds: Sequelize.INTEGER,
  photoUrl: Sequelize.STRING,
  superhost: Sequelize.BOOLEAN,
  favorite: Sequelize.BOOLEAN,
  rating: Sequelize.FLOAT,
  numOfRatings: Sequelize.INTEGER,
  description: Sequelize.STRING,
  price: Sequelize.FLOAT,
  listID: Sequelize.INTEGER
});

User.hasMany(Favorite);
Favorite.belongsTo(User);

User.hasMany(FavoriteList);
FavoriteList.belongsTo(User);

Favorite.hasMany(FavoriteList);
FavoriteList.belongsTo(Favorite);

Favorite.hasMany(Listing);
Listing.belongsTo(Favorite);

Listing.hasMany(RelatedListing);
RelatedListing.belongsTo(Listing);

db.sync();

module.exports = {
  db,
  User,
  Favorite,
  FavoriteList,
  Listing,
  RelatedListing
};
