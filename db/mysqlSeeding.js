const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parse');
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sudoroot',
  database: 'moreListings'
  //dialect: 'mariadb'
});

db.on('error', (err) => {
  console.log('Error: ', err.toString());
});

const sql = `LOAD DATA LOCAL INFILE './db/users.csv' INTO TABLE Users FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';`;
db.query(sql, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
  db.end();
});
// no headers in csv file so loading from the file directly will work
const sql1 = `LOAD DATA LOCAL INFILE './db/favorites.csv' INTO TABLE Favorites FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';`;
db.query(sql1, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
// (type,numOfBeds,photoUrl,superhost,rating,numOfRatings,description,price,FavoriteListId)
const sql2 = `LOAD DATA LOCAL INFILE './db/favListings.csv' INTO TABLE favoriteLists FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';`;
db.query(sql2, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
// insert into table
const sql3 = `LOAD DATA LOCAL INFILE './db/listings.csv' INTO TABLE Listings FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';`;
db.query(sql3, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

// insert rows into table
const sql4 = `LOAD DATA LOCAL INFILE './db/relatedListings.csv' INTO TABLE relatedListings FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';`;
db.query(sql4, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});




