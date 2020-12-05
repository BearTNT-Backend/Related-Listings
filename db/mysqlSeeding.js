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

// read each csv file
// fs.readFile(path.resolve(__dirname, './listings.csv'), {
//   encoding: 'utf-8'
// }, (err, csvData) => {
//   if (err) {
//     console.log(err);
//   }

//   csvParser(csvData, {
//     delimeter: ','
//   }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // no headers in csv file so loading from the file directly will work
//       // (type,numOfBeds,photoUrl,superhost,rating,numOfRatings,description,price,FavoriteListId)
//       // insert rows into table
//       const sql = `LOAD DATA LOCAL INFILE './db/listings.csv' INTO TABLE Listings FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';`;
//       db.query(sql, (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(result);
//         }
//       });
//     }
//   })
// });

fs.readFile(path.resolve(__dirname, './relatedListings.csv'), {
  encoding: 'utf-8'
}, (err, csvData) => {
  if (err) {
    console.log(err);
  }

  csvParser(csvData, {
    delimeter: ','
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // no headers in csv file so loading from the file directly will work
      // insert rows into table
      const sql = `LOAD DATA LOCAL INFILE './db/relatedListings.csv' INTO TABLE relatedListings FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    }
  })
});

// fs.readFile(path.resolve(__dirname, './favListings.csv'), {
//   encoding: 'utf-8'
// }, (err, csvData) => {
//   if (err) {
//     console.log(err);
//   }

//   csvParser(csvData, {
//     delimeter: ','
//   }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // no headers in csv file so loading from the file directly will work
//       // insert rows into table
//       const sql = `LOAD DATA LOCAL INFILE './db/favListings.csv' INTO TABLE favoriteLists FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';`;
//       db.query(sql, (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(result);
//         }
//       });
//     }
//   })
// });

// fs.readFile(path.resolve(__dirname, './favorites.csv'), {
//   encoding: 'utf-8'
// }, (err, csvData) => {
//   if (err) {
//     console.log(err);
//   }

//   csvParser(csvData, {
//     delimeter: ','
//   }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // no headers in csv file so loading from the file directly will work
//       // insert rows into table
//       const sql = `LOAD DATA LOCAL INFILE './db/favorites.csv' INTO TABLE Favorites FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';`;
//       db.query(sql, (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(result);
//         }
//       });
//     }
//   })
// });

// fs.readFile(path.resolve(__dirname, './users.csv'), {
//   encoding: 'utf-8'
// }, (err, csvData) => {
//   if (err) {
//     console.log(err);
//   }

//   csvParser(csvData, {
//     delimeter: ','
//   }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // no headers in csv file so loading from the file directly will work
//       // insert rows into table
//       const sql = `LOAD DATA LOCAL INFILE './db/users.csv' INTO TABLE Users FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';`;
//       db.query(sql, (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(result);
//         }
//         db.end();
//       });
//     }
//   })
// });
db.end();
