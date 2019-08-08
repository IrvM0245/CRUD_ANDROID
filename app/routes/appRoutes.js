module.exports = function(app) {
  var PersonList = require('../controller/PersonController');

  // PersonList Routes
  app.route('/person')
    .get(PersonList.list_all_persons)
    .post(PersonList.create_a_person);

    app.route('/1')
    .get(PersonList.mensaje_sencillo)

   app.route('/:personId')
    .get(PersonList.read_a_person)
    .put(PersonList.update_a_person)
    .delete(PersonList.delete_a_person);

  };
