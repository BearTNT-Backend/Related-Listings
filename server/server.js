const express = require('express');
const path = require('path');
const db = require('../db/db.js');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3004;

app.get('/listing/*', (req, res) => {
  if (+req.params['0'] >= 1 && +req.params['0'] <= 100) {
    res.status(200);
    res.sendFile(path.join(__dirname, '../public/dist/index.html'));
  } else {
    res.status(404);
    res.end();
  }
});

// getting the related listings for a specific listing
app.get('/api/more/listings/:id', (req, res) => {
  var listingId = req.params.id;
  db.Listing.findOne({lId: listingId})
    .then(data => {
      if (data === null) {
        throw new Error(`No data for listing ${listingId}`);
      }
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.send(404);
    });
});

// getting all of the users favorite lists
app.get('/api/more/users/:id/favorites', (req, res) => {
  var userId = {uId: req.params.id};
  db.User.findOne(userId)
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      console.log(err);
      res.status(404);
    });
});

// creating new related listing for a listing
app.put('/api/more/listings/:id', (req, res) => {
  var listingId = {lId: req.params.id};
  console.log(req.body);
  var newRelatedListing = {
    id: req.body.id,
    type: req.body.type,
    numOfBeds: req.body.numOfBeds,
    superhost: req.body.superhost,
    favorite: req.body.favorite,
    rating: req.body.rating,
    numOfRatings: req.body.numOfRatings,
    description: req.body.description,
    price: req.body.price
  };

  db.Listing.findOneAndUpdate(listingId, { $push: {relatedListings: newRelatedListing }})
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
    });
});


// adding a list to the users favorite lists
app.put('/api/more/users/:id/favorites', (req, res) => {
  var userId = {uId: req.params.id};
  var newList = {
    name: req.body.listName,
    photoUrl: null,
    listings: []
  };
  db.User.findOneAndUpdate(userId, { $push: { favorites: newList}})
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
    });
});


// adding a listing to a list in the users favorite lists
app.put('/api/more/users/:id/:listname/:lid', (req, res) => {
  var userId = {uId: req.params.id};
  var listingId = +req.params.lid;
  var listName = req.params.listname;
  db.User.findOne(userId)
    .then(results => {
      for (let i = 0; i < results.favorites.length; i++) {
        if (results.favorites[i].name === listName) {
          var index = i;
          break;
        }
      }
      results.favorites[index].listings.push(listingId);
      return db.User.findOneAndUpdate(userId, { favorites: results.favorites});
    })
    .then(() => {
      return db.findOne(userId);
    })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      console.log(err);
      res.status(404);
    });
});

// deleting a related listing from a listing
app.delete('/api/more/listings/:lid/relatedListings/:rid', (req, res) => {
  var listingId = {lId: req.params.lid};
  var relatedListingId = +req.params.rid;
  console.log(listingId, relatedListingId);
  db.Listing.find(listingId)
    .then(results => {
      let listings = results[0].relatedListings;
      listings = listings.filter(obj => {
        return obj.id !== relatedListingId;
      });
      return db.Listing.findOneAndUpdate(listingId, { relatedListings: listings});
    })
    .then(() => {
      return db.Listing.findOne(listingId);
    })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      console.log(err);
    });
});
// deleting a listing from favorites list
app.delete('/api/more/users/:id/:listname', (req, res) => {
  var userId = {uId: req.params.id};
  // capture list name
  var listName = req.params.listname;
  console.log(userId, listName);
  // find listing from users favorites list and remove it from db
  // return response
});

app.listen(port, () => {
  console.log(`Server connected at http://localhost:${port}`);
});

db.con.on('error', console.error.bind(console, 'error'));
db.con.once('open', () => {
  console.log('Connected to beartnt!');
});