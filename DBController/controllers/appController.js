"use strict";

var KhachHang = require("../models/appModel.js");

exports.list_all_guest = function (req, res) {
  KhachHang.getAllGuest(function (err, kh) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", kh);
    res.send(kh);
  });
};

exports.create_a_guest = function (req, res) {
  var new_guest = new KhachHang(req.body);

  KhachHang.createGuest(new_guest, function (err, kh) {
    if (err) res.send(err);
    res.json(kh);
  });
};

exports.read_a_guest = function (req, res) {
    KhachHang.getGuestById(req.params.makh, function (err, kh) {
    if (err) res.send(err);
    res.json(kh);
  });
};

exports.update_a_guest = function (req, res) {
    KhachHang.updateById(req.params.makh, new KhachHang(req.body), function (err, kh) {
    if (err) res.send(err);
    res.json(kh);
  });
};

exports.delete_a_guest = function (req, res) {
    KhachHang.remove(req.params.makh, function (err, kh) {
    if (err) res.send(err);
    res.json({ message: "Guest successfully deleted" });
  });
};
