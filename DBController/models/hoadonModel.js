'user strict';
var sql = require('./db.js');

//Task object constructor
var HoaDon = function(hd){
    this.mahd = hd.mahd;
    this.maphong = hd.maphong;
    this.songay = hd.songay;
};
HoaDon.createHoaDon = function (newHoaDon, result) {
    sql.query("INSERT INTO hoadon set ?", newHoaDon, function (err, res) {
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


module.exports= HoaDon;