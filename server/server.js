require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3004;

// -- MongoDB --
//const db = require('../db/db.js');

// -- MySQL --
const db = require('../db/mysql/db.js');


app.get('/listing/*', (req, res) => {
  if (+req.params['0'] >= 1 && +req.params['0'] <= 100) {
    res.status(200);
    res.sendFile(path.join(__dirname, '../public/dist/index.html'));
  } else {
    res.status(404);
    res.end();
  }
});

app.get('/loaderio-*', (req, res) => {
  res.sendFile(path.join(__dirname, '../loaderio-95b3c0224ec9e8a8c15a26330451e8e5.txt'));
});

// // getting the related listings for a specific listing
// app.get('/api/more/listings/:id', (req, res) => {
//   var listingId = req.params.id;
//   db.Listing.findOne({lId: listingId})
//     .then(data => {
//       if (data === null) {
//         throw new Error(`No data for listing ${listingId}`);
//       }
//       res.status(200).send(data);
//     })
//     .catch(err => {
//       console.log(err);
//       res.send(404);
//     });
// });

// // getting all of the users favorite lists
// app.get('/api/more/users/:id/favorites', (req, res) => {
//   var userId = {uId: req.params.id};
//   db.User.findOne(userId)
//     .then(results => {
//       res.status(200).send(results);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(404);
//     });
// });

// // creating new related listing for a listing
// app.put('/api/more/listings/:id', (req, res) => {
//   var listingId = {lId: req.params.id};
//   console.log(req.body);
//   var newRelatedListing = {
//     id: req.body.id,
//     type: req.body.type,
//     numOfBeds: req.body.numOfBeds,
//     superhost: req.body.superhost,
//     favorite: req.body.favorite,
//     rating: req.body.rating,
//     numOfRatings: req.body.numOfRatings,
//     description: req.body.description,
//     price: req.body.price
//   };

//   db.Listing.findOneAndUpdate(listingId, { $push: {relatedListings: newRelatedListing }})
//     .then(result => {
//       res.status(200).send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });


// // adding a list to the users favorite lists
// app.put('/api/more/users/:id/favorites', (req, res) => {
//   var userId = {uId: req.params.id};
//   var newList = {
//     name: req.body.listName,
//     photoUrl: null,
//     listings: []
//   };
//   db.User.findOneAndUpdate(userId, { $push: { favorites: newList}})
//     .then(result => {
//       res.status(200).send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });


// // adding a listing to a list in the users favorite lists
// app.put('/api/more/users/:id/:listname/:lid', (req, res) => {
//   var userId = {uId: req.params.id};
//   var listingId = +req.params.lid;
//   var listName = req.params.listname;
//   db.User.findOne(userId)
//     .then(results => {
//       for (let i = 0; i < results.favorites.length; i++) {
//         if (results.favorites[i].name === listName) {
//           var index = i;
//           break;
//         }
//       }
//       results.favorites[index].listings.push(listingId);
//       return db.User.findOneAndUpdate(userId, { favorites: results.favorites});
//     })
//     .then(() => {
//       return db.findOne(userId);
//     })
//     .then(results => {
//       res.status(200).send(results);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(404);
//     });
// });

// // deleting a related listing from a listing
// app.delete('/api/more/listings/:lid/relatedListings/:rid', (req, res) => {
//   var listingId = {lId: req.params.lid};
//   var relatedListingId = +req.params.rid;
//   db.Listing.find(listingId)
//     .then(results => {
//       let listings = results[0].relatedListings;
//       listings = listings.filter(obj => {
//         return obj.id !== relatedListingId;
//       });
//       return db.Listing.findOneAndUpdate(listingId, { relatedListings: listings});
//     })
//     .then(() => {
//       return db.Listing.findOne(listingId);
//     })
//     .then(results => {
//       res.status(200).send(results);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// // deleting a listing from favorites list
// app.delete('/api/more/users/:id/:listname/:lid', (req, res) => {
//   var userId = {uId: req.params.id};
//   var listName = req.params.listname;
//   var listingId = +req.params.lid;
//   listName = listName.split(/(?=[A-Z])/).join(' ');

//   db.User.findOne(userId)
//     .then(results => {
//       let ind;
//       let favorites = results.favorites.filter((obj, index) => {
//         if (obj.name === listName) {
//           ind = index;
//         }
//         return obj.name === listName;
//       });
//       let newFavorites = favorites[0];
//       let list = newFavorites.listings;
//       list = list.filter(item => {
//         return item !== listingId;
//       });
//       newFavorites.listings = list;
//       results.favorites[ind] = newFavorites;

//       return db.User.findOneAndUpdate(userId, { favorites: results.favorites });
//     })
//     .then(() => {
//       return db.User.findOne(userId);
//     })
//     .then(results => {
//       res.status(200).send(results);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(404);
//     });
// });

// *********** SDC ********** //

// getting the related listings for a specific listing
app.get('/api/more/listings/:id', (req, res) => {
  let listID = +req.params.id;
  db.getRelatedListings(listID, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(data);
    }
  });
});

// get single related listing using related listing id
app.get('/api/more/relatedListings/:id', (req, res) => {
  console.log(req.params.id);
  db.getRelatedListing(id, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(data);
    }
  });
});

// getting all of the users favorite lists
app.get('/api/more/users/:id/favoritesLists', (req, res) => {
  let uID = +req.params.id;
  db.getAllUserFavoriteLists(uID, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/api/more/users/:id/favorites', (req, res) => {
  let uID = +req.params.id;
  db.getUserFavorites(uID, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send([+req.params.id, data]);
    }
  });
});

// adding a list to the users favorite lists
app.post('/api/more/users/:id/favoritesLists', (req, res) => {
  var newList = {
    name: req.body.name,
    photoUrl: req.body.photoUrl,
    favID: req.body.favID,
    uID: +req.params.id
  };
  db.newFavList(newList, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(data);
    }
  });
});

// creating new related listing for a listing
app.post('/api/more/listings/:id', (req, res) => {
  let newRelListing = {
    type: req.body.type,
    numOfBeds: req.body.numOfBeds,
    photoUrl: req.body.photoUrl,
    superhost: req.body.superhost,
    favorite: req. body.favorite,
    rating: req.body.rating,
    numOfRatings: req.body.numOfRatings,
    description: req.body.description,
    price: req.body.price,
    listID: +req.params.id
  };

  db.newRelatedListing(newRelListing, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json(data);
    }
  });
});

// updating a related listing to be a superhost
app.put('/api/more/relatedListings/:id', (req, res) => {
  db.updateRelatedListings('superhost', 'true', +req.params.id, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(data);
    }
  });
});

// deleting a relatedListing
app.delete('/api/more/listings/:lid/relatedListings/:rid', (req, res) => {
  //delete related listing with the rid where listID = lid
  db.deleteRelatedListing(+req.params.rid, +req.params.lid, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server connected at http://localhost:${port}`);
});

// db.con.on('error', console.error.bind(console, 'error'));
// db.con.once('open', () => {
//   console.log('Connected to beartnt!');
// });
