const mysql = require("mysql")
const connection =mysql.createConnection({
    host:"localhost",
    user :"root",
    password :null,
    database:"library_book",
});

connection.connect((error) => {
 if(error) {
     console.log(error);
 } else {
     console.log("connected...");
 }
});

module.exports = connection;