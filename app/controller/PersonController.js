var Person = require('../model/appModel.js');




exports.mensaje_sencillo = function (res){
  Person.Mensaje(function(error,resp){ 
    res.send(resp) 
  });
};

exports.list_all_persons = function(req, res) {
  Person.getAllPerson(function(err, person) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', person);
    res.json(person);
  });
};

exports.create_a_person = function(req, res) {
  var new_person = new Person(req.body);

  //handles null error
   if( !new_person.id || !new_person.nombre || !new_person.materno || !new_person.paterno || !new_person.rfc || !new_person.domicilio || !new_person.localidad){

            res.status(400).send({ error:true, message: 'por favor ingresa datos de la persona' });

        }
else{

  Person.createPerson(new_person, function(err, person) {

    if (err)
      res.send(err);
    res.json(person);
  });
}
};

exports.read_a_person = function(req, res) {
  Person.getPersonById(req.params.personId, function(err, person) {
    if (err)
      res.send(err);
    res.json(person);
  });
};



exports.update_a_person = function(req, res) {
  Person.updateById(req.params.personId, new Person(req.body), function(err, person) {
    if (err)
      res.send(err);
    res.json(person);
  });
};

exports.delete_a_person = function(req, res) {
  Person.remove( req.params.personId, function(err, person) {
    if (err)
      res.send(err);
    res.json({ message: 'Persona eliminada' });
  });
};


/*exports.consult_restaurants = function(req, res) {
  Client.getRestaurants(function(err, restaurant) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', restaurant);

      for (var rest in restaurant) {
        if (object.hasOwnProperty('id')) {

        }
      }
  });
};*/
