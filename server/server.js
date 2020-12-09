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
  let listingId = {listID: +req.params.id};
  db.RelatedListing.findAll({ where: listingId, limit: 12})
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      console.log(err);
      res.status(404);
    });
});

// get single related listing using related listing id
app.get('/api/more/relatedListings/:id', (req, res) => {
  console.log(req.params.id);
  db.RelatedListing.findOne({ where: { id: +req.params.id }})
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      console.log(err);
      res.status(404);
    })
})

// creating new related listing for a listing
app.post('/api/more/listings/:id', (req, res) => {
  console.log(req.body);
  let newRelatedListing = {
    type: req.body.type,
    numOfBeds: req.body.numOfBeds,
    superhost: req.body.superhost,
    rating: req.body.rating,
    numOfRatings: req.body.numOfRatings,
    description: req.body.description,
    price: req.body.price,
    listID: +req.params.id
  };

  db.RelatedListing.create(newRelatedListing)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// updating a related listing to be a superhost
app.put('/api/more/relatedListings/:id', (req, res) => {
  db.RelatedListing.update({ superhost: true }, {
    where: { id: +req.params.id}
  })
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
});

// deleting a relatedListing
// app.delete('/api/more/listings/:lid/relatedListings/:rid', (req, res) => {
  // delete related listing with the rid where listID = lid
  // db.RelatedListing
//});

app.listen(port, () => {
  console.log(`Server connected at http://localhost:${port}`);
});

// db.con.on('error', console.error.bind(console, 'error'));
// db.con.once('open', () => {
//   console.log('Connected to beartnt!');
// });