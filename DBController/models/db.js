'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'khachsan'
});
// connect to database
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;