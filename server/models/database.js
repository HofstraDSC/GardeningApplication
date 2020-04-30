'user strict';

var mysql = require('promise-mysql');

const db = {};
//local mysql db connection
var connection = mysql.createConnection({
    host     : '35.237.100.8',
    user     : 'root',
    password : 'hofstradsc2020',
    database : ''
});

connection.then((con) =>{
    console.log("Database Connected");
    db.con = con;
});

module.exports = db;
