"use strict";
module.exports = function (app) {
  var guest = require("../controllers/appController");
  var thue = require("../controllers/thueController");
  var phong = require("../controllers/phongController");
  var hoadon = require("../controllers/hoadonController");
  // guest Routes
  app.route("/guest").get(guest.list_all_guest).post(guest.create_a_guest);

  app
    .route("/guest/:makh")
    .get(guest.read_a_guest)
    .put(guest.update_a_guest)
    .delete(guest.delete_a_guest);

  app.route("/phong").get(phong.list_all_phong).post(phong.create_a_phong);

  app
    .route("/phong/:maphong")
    .get(phong.read_a_phong)
    .put(phong.update_a_phong)
    .delete(phong.delete_a_phong);

  app.route("/thue").post(thue.create_a_thue);

  app.route("/thue/:mathue").get(thue.read_a_thue).delete(thue.delete_a_thue);
  app.route("/hoadon").post(hoadon.create_a_hoadon);
};
