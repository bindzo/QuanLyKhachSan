'use strict';
module.exports = function(app) {
    
   var guest = require('../controllers/appController');
var thue = require('../controllers/thueController');
   // guest Routes
   app.route('/guest')
       .get(guest.list_all_guest)
       .post(guest.create_a_guest);

   app.route('/guest/:makh')
       .get(guest.read_a_guest)
       .put(guest.update_a_guest)
       .delete(guest.delete_a_guest);
    
    app.route('/thue')
       .post(thue.create_a_thue);

   app.route('/thue/:mathue')
       .get(thue.read_a_thue)
       .delete(thue.delete_a_thue);
         
};