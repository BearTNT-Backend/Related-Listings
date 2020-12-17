// This requires a database called moreListings to already be
//   in MySQL or MariaDB
// If using MySQL, change dialect on line 10 to MySQL
// You will also need to change the username and password on line 8
//   'root' and 'sudoroot' currently

//const { Sequelize } = require('sequelize');

const db = require('./login.js');

let getRelatedListings = (listID, callback) => {
  let query = `SELECT * FROM RelatedListings WHERE listID = ${listID} LIMIT 12`;
  db.query(query, (err, res) => {
    if (err) {
      console.log('Error', err);
      callback(err, res);
    }
    callback(null, res);
  });
};

let getRelatedListing = (id, callback) => {
  let query = `SELECT * FROM RelatedListings WHERE id = ${id}`;
  db.query(query, (err, res) => {
    if (err) {
      console.log('Error', err);
      callback(err, res);
    }
    callback(null, res);
  });
};

let getAllUserFavoriteLists = (uID, callback) => {
  let query = `SELECT * FROM FavoriteLists WHERE id = ${uID}`;
  db.query(query, (err, res) => {
    if (err) {
      console.log('Error', err);
      callback(err, res);
    }
    callback(null, res);
  });
};

let getUserFavorites = (uID, callback) => {
  let query = `SELECT listID FROM Favorites WHERE id = ${uID}`;
  db.query(query, (err, res) => {
    if (err) {
      console.log('Error', err);
      callback(err, res);
    }
    callback(null, res);
  });
};

let newRelatedListing = (data, callback) => {
  let values = [data.type, data.numOfBeds, data.photoUrl, data.superhost, data.favorite, data.rating, data.numOfRatings, data.description, data.price, data.listID];
  let query = `INSERT INTO RelatedListings (type, numOfBeds, photoUrl,     superhost, favorite, rating, numOfRatings, description, price, listID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, values, (err, res) => {
    if (err) {
      console.log('Error', err);
      callback(err, res);
    }
    callback(null, res);
  });
};

let newFavList = (data, callback) => {
  let values = [data.name, data.photoUrl, data.favID, data.uID];
  let query = `INSERT INTO FavoriteLists (name, photoUrl, favID, uID) VALUES (?, ?, ?, ?)`;
  db.query(query, values, (err, res) => {
    if (err) {
      console.log('Error', err);
      callback(err, res);
    }
    callback(null, res);
  });
};

let updateRelatedListings = (element, newValue, id, callback) => {
  let query = `UPDATE RelatedListings SET ${element} = ${newValue} WHERE id = ${id}`;
  db.query(query, (err, res) => {
    if (err) {
      console.log('Error', err);
      callback(err, res);
    }
    callback(null, res);
  });
};

let deleteRelatedListing = (rid, lid, callback) => {
  let query = `DELETE FROM RelatedListings WHERE id = ${rid} AND listID = ${lid}`;
  db.query(query, (err, res) => {
    if (err) {
      console.log('Error', err);
      callback(err, res);
    }
    callback(null, res);
  });
};

module.exports = {
  db,
  getRelatedListings,
  getAllUserFavoriteLists,
  getUserFavorites,
  newRelatedListing,
  newFavList,
  updateRelatedListings,
  deleteRelatedListing
};
