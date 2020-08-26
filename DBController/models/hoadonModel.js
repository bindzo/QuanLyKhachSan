'user strict';
var sql = require('./db.js');

//Task object constructor
var HoaDon = function(hd){
    this.mahd = hd.mahd;
    this.ngaylap = hd.ngaylap;
    this.makh = hd.makh;
    this.mathue = hd.mathue;
    this.tongtien = hd.tongtien
};
HoaDon.createHoaDon = function (newHoaDon, result) {
    console.log(newHoaDon);
    sql.query("Select makh from khachhang where mathue = ? ", newHoaDon.mathue, function (err, res) {
        if(err) {
            console.log("error: ", err);
        }
        else{
            console.log(res);

        }
    });
    // sql.query("INSERT INTO hoadon set ?", newHoaDon, function (err, res) {
    //     if(err) {
    //         console.log("error: ", err);
    //         result(err, null);
    //     }
    //     else{
    //         console.log(res.insertId);
    //         result(null, res.insertId);
    //     }
    // });
};


module.exports= HoaDon;