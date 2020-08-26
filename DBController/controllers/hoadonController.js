"use strict";

var HoaDon = require("../models/hoadonModel.js");

exports.create_a_hoadon = function (req, res) {
  var new_hoadon = new HoaDon(req.body);

  HoaDon.createHoaDon(new_hoadon, function (err, kh) {
    if (err) res.send(err);
    res.json(kh);
  });
};