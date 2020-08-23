"use strict";

var Thue = require("../models/thueModel.js");

exports.create_a_thue = function (req, res) {
  var new_thue = new Thue(req.body);

  Thue.createThue(new_thue, function (err, kh) {
    if (err) res.send(err);
  });
};

exports.read_a_thue = function (req, res) {
  Thue.getThueById(req.params.mathue, function (err, kh) {
    if (err) res.send(err);
    res.json(kh);
  });
};

exports.delete_a_thue = function (req, res) {
  Thue.remove(req.params.mathue, function (err, kh) {
    if (err) res.send(err);
    res.json({ message: "Thue successfully deleted" });
  });
};
