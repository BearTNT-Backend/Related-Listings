require('newrelic');
const compression = require('compression');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3004;

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

