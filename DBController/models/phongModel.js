'user strict';
var sql = require('./db.js');

//Task object constructor
var Phong = function(phong){
    this.maphong = phong.maphong;
    this.loai = phong.loai;
    this.ghichu = phong.ghichu;
    this.gia = phong.gia;
    this.tinhtrang = phong.tinhtrang;
};
Phong.createPhong = function (newPhong, result) {
    sql.query("INSERT INTO phong set ?", newPhong, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};
Phong.getPhongById = function createUser(id, result) {
    sql.query("Select * from phong where maphong = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
Phong.getAllPhong = function(result) {
    sql.query("Select * from phong", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);

        }
        else{
            result(null, res);
        }
    });
};
Phong.updateById = function(id, kh, result){
    console.log(id, kh);
    sql.query("UPDATE phong SET tinhtrang = ?  WHERE maphong = ?", [kh.tinhtrang, id], function (err, res) {
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
Phong.remove = function(id, result){
    sql.query("DELETE FROM phong WHERE maphong = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= Phong;