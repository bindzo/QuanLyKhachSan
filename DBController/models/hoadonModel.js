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
            console.log(res[0].makh);
            newHoaDon.makh=res[0].makh;
        }
    });
    sql.query("Select songay from thue where mathue = ? ", newHoaDon.mathue, function (err, res) {
        if(err) {
            console.log("error: ", err);
        }
        else{
            console.log(res[0].songay);
            newHoaDon.tongtien=res[0].songay;
        }
    });
    let maphong = newHoaDon.mathue.slice(0,newHoaDon.mathue.length-2);
    console.log(maphong);
    sql.query("Select gia from phong where maphong = ? ", maphong, function (err, res) {
        if(err) {
            console.log("error: ", err);
        }
        else{
            console.log(res[0].gia);
            newHoaDon.tongtien*=res[0].gia;
            newHoaDon.mahd=null;
            sql.query("INSERT INTO hoadon set ?", newHoaDon, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    sql.query("Select * from hoadon where mahd = ? ", res.insertId, function (err, res) {
                        if(err) {
                            console.log("error: ", err);
                        }
                        else{
                            console.log(res);

                            result(err, res);

                        }
                    });
                }
            });
            
        }
    });

   
};


module.exports= HoaDon;