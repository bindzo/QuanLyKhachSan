'use strict';
module.exports = function(app) {
    
    console.log(1);
   var todoList = require('../controllers/appController');
    console.log(2);
   // todoList Routes
   app.route('/guest')
       .get(todoList.list_all_guest)
       .post(todoList.create_a_guest);

   app.route('/guest/:makh')
       .get(todoList.read_a_guest)
       .delete(todoList.delete_a_guest);
};