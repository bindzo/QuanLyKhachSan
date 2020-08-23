'user strict';
var sql = require('./db.js');

//Task object constructor
var Thue = function(thue){
    this.mathue = thue.mathue;
    this.maphong = thue.maphong;
    this.songay = thue.songay;
};
Thue.createThue = function (newThue, result) {
    sql.query("INSERT INTO thue set ?", newThue, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Thue.getThueById = function createUser(id, result) {
    sql.query("Select * from thue where mathue = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
Thue.remove = function(id, result){
    sql.query("DELETE FROM thue WHERE mathue = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= Thue;