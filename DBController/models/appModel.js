'user strict';
var sql = require('./db.js');

//Task object constructor
var KhachHang = function(khachhang){
    this.makh = khachhang.makh;
    this.ten = khachhang.ten;
    this.loai = khachhang.loai;
    this.cmnd = khachhang.cmnd;
    this.diachi = khachhang.diachi;
    this.mathue = khachhang.mathue;
};
KhachHang.createGuest = function (newGuest, result) {
    sql.query("INSERT INTO khachhang set ?", newGuest, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};
KhachHang.getGuestById = function createUser(id, result) {
    sql.query("Select * from khachhang where makh = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
KhachHang.getAllGuest = function(result) {
    sql.query("Select * from khachhang", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
KhachHang.updateById = function(id, kh, result){
    console.log(id, kh);
    sql.query("UPDATE khachhang SET mathue =?  WHERE makh = ?", [kh.mathue, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log("ok")
            result(null, res);
        }
    });
};
KhachHang.remove = function(id, result){
    sql.query("DELETE FROM khachhang WHERE makh = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= KhachHang;