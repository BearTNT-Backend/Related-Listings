const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'morelistings.cmbjbzbmto7l.us-east-2.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'sudoroot',
  database: 'moreListings'
});

con.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to database!');
  }
});

module.exports = con;
