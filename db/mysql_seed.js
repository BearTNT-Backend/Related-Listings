const faker = require('faker');
// const {mySqlDB, User, Favorite, FavoriteList, Listing, RelatedListing } = require('./mysql.js');
const path = require('path');
const ObjectsToCsv = require('objects-to-csv');

// setup id counters rId for related, id for listings, and uId for users
// var id = 1;
// var uId = 1;

// Array of photo urls from s3
var photoUrls = ['https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/031dcb9df9b7f59febe978bf8ccdcc3d.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/08cd1c223709821d4833dd004e4d35e2-p_e.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/1_p1zBnv11CSx_EII8sB9Uaw.jpeg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/1407953244000-177513283.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/27514080792_6371181022_o.0.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/42beb0625d2c8673ce3d8317d495454b.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/960x0.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/969ae4bb-efd1-4fb9-a4e3-5cb3316dd3c9.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Airbnb-rental-tips.-Hostmaker-1-620x349.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/airbnb-tips-greenwich-village-apt.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/amish-prefab-cabins-and-log-home-for-sale.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/blueground-apartment-2-2-2.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/d062d4a3c20ed27f4a8bf843a449dc68.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/d55b10d433b07982c487b40d9e27420f.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/detail-EXP-header.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Donnas-Premier-Lodging-Cabin-Google.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/fecc83ebe360dcf44233210ebf29f958.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/harman-s-luxury-log-cabins.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Log-Cabin-Homes-Stunning-Log-Cabin.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/log-cabin-master-result-standard.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/log-cabin-master-result-standard.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Modular-Cabin3-scaled.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Villa-Homes-Photos-by-Chris-web-2.jpg', 'https://fec-photos-beartnt.s3-us-west-1.amazonaws.com/fec_pictures/Winchester-Homes-uncategorized-2710.jpg'];


// house types reflecting real airbnb house types
var houseTypes = ['Entire house', 'Hotel room', 'Entire apartment', 'Tent', 'Private room', 'Entire condominium'];

// makes an array of related listings 12 per listing
var relatedMaker = function(max) {
  var array = [];

  while (array.length < max) {
    array.push({
      type: houseTypes[Math.floor(Math.random() * houseTypes.length)],
      numOfBeds: Math.ceil(Math.random() * 5),
      photoUrl: photoUrls[Math.floor(Math.random() * photoUrls.length)],
      superhost: faker.random.boolean(),
      rating: (Math.random() * 5).toFixed(2),
      numOfRatings: faker.random.number({'min': 1, 'max': 500}),
      description: faker.lorem.sentence(),
      price: faker.random.number({'min': 30, 'max': 500}),
      ListingId: faker.random.number({'min': 0, 'max': 100})
    });
  }
  return array;
};

// Makes max (100) listing primary entries with id's from 1 - 100 and a list of related listings
// 100
var listingsMaker = function(max) {
  var array = [];
  while (array.length < max) {
    array.push({
      type: houseTypes[Math.floor(Math.random() * houseTypes.length)],
      numOfBeds: Math.ceil(Math.random() * 5),
      photoUrl: photoUrls[Math.floor(Math.random() * photoUrls.length)],
      superhost: faker.random.boolean(),
      rating: (Math.random() * 5).toFixed(2),
      numOfRatings: faker.random.number({'min': 1, 'max': 500}),
      description: faker.lorem.sentence(),
      price: faker.random.number({'min': 30, 'max': 500}),
      FavoriteListId: Math.ceil(Math.random() * 6)
    });
  }
  return array;
};

// semi real potential list titles for users
var favoriteTitles = ['Favorites', 'Beach Homes', 'Weekend Getaways', 'Ski Spots', 'Campsites', 'Good Nightlife'];

// Makes user ids for favorites table
var favoritesMaker = function(max) {
  var array = [];
  while (array.length < max) {
    var UserId = Math.ceil(Math.random() * 100);
    if (!array.some(user => user.UserId === UserId)) {
      array.push({UserId: UserId});
    }
  }
  return array;
};

// Makes a list of favorites that each contain a title, url, and listing id
var favoritesListingMaker = function(max) {
  var array = [];
  for (let i = 0; i < max; i++) {
    array.push({
      name: favoriteTitles[i],
      photoUrl: photoUrls[Math.floor(Math.random() * photoUrls.length)],
      listingId: faker.random.number({'min': 0, 'max': 100})
    });
  }
  return array;
};

// Makes max(users) storing username and an array of all of their favorite lists
var userMaker = function(max) {
  array = [];
  while (array.length < max) {
    array.push({
      userName: faker.internet.userName()
    });
  }
  return array;
};

(async () => {
  const favorites = await favoritesMaker(50);
  const favListings = await favoritesListingMaker(50);
  const listings = await listingsMaker(50);
  const users = await userMaker(50);
  const relatedListings = await relatedMaker(100000);
  const relatedListings2 = await relatedMaker(100000);
  const relatedListings3 = await relatedMaker(100000);
  const relatedListings4 = await relatedMaker(100000);
  const relatedListings5 = await relatedMaker(100000);
  const relatedListings6 = await relatedMaker(100000);
  const relatedListings7 = await relatedMaker(100000);
  const relatedListings8 = await relatedMaker(100000);
  const relatedListings9 = await relatedMaker(100000);
  const relatedListings10 = await relatedMaker(100000);


  const csv1 = new ObjectsToCsv(favorites);
  const csv2 = new ObjectsToCsv(favListings);
  const csv3 = new ObjectsToCsv(listings);
  const csv4 = new ObjectsToCsv(relatedListings);
  const csv5 = new ObjectsToCsv(relatedListings2);
  const csv6 = new ObjectsToCsv(relatedListings3);
  const csv7 = new ObjectsToCsv(relatedListings4);
  const csv8 = new ObjectsToCsv(relatedListings5);
  const csv9 = new ObjectsToCsv(relatedListings6);
  const csv10 = new ObjectsToCsv(relatedListings7);
  const csv11 = new ObjectsToCsv(relatedListings8);
  const csv12 = new ObjectsToCsv(relatedListings9);
  const csv13 = new ObjectsToCsv(relatedListings10);
  const csv14 = new ObjectsToCsv(users);

  await csv1.toDisk(path.resolve(__dirname, './data.csv'));
  await csv2.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv3.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv4.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv5.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv6.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv7.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv8.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv9.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv10.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv11.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv12.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv13.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  await csv14.toDisk(path.resolve(__dirname, './data.csv'), {append: true, allColumns: true});
  console.log('CSV files made!');
})();


// User.bulkCreate(users);
// Favorite.bulkCreate(favorites);
// FavoriteList.bulkCreate(favListings);
// Listing.bulkCreate(listings);
// RelatedListing.bulkCreate(relatedListings);



