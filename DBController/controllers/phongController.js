"use strict";

var Phong = require("../models/phongModel.js");

exports.list_all_phong = function (req, res) {
  Phong.getAllPhong(function (err, kh) {
    if (err) res.send(err);
    res.send(kh);
  });
};

exports.create_a_phong = function (req, res) {
  var new_phong = new Phong(req.body);

  Phong.createPhong(new_phong, function (err, kh) {
    if (err) res.send(err);
    res.json(kh);
  });
};

exports.read_a_phong = function (req, res) {
    Phong.getPhongById(req.params.maphong, function (err, kh) {
    if (err) res.send(err);
    res.json(kh);
  });
};

exports.update_a_phong = function (req, res) {
    Phong.updateById(req.params.maphong, new Phong(req.body), function (err, kh) {
    if (err) res.send(err);
    console.log(kh);
    res.json(kh).end();
  });
}; 

exports.delete_a_phong = function (req, res) {
    Phong.remove(req.params.maphong, function (err, kh) {
    if (err) res.send(err);
    res.json({ message: "Phong successfully deleted" });
  });
};
