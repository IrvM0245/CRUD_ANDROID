var sql = require('./db.js');

//Restaurant object constructor
var Person = function(person){
    this.id = person.id;
    this.nombre = person.nombre;
    this.materno = person.materno;
    this.paterno = person.paterno;
    this.rfc = person.rfc;
    this.domicilio = person.domicilio;
    this.localidad = person.localidad;
};


Person.getAllPerson = function (result) {
    sql.query("Select * from persona", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('Personas : ', res);
             result(null, res);
            }
        });
};

Person.createPerson = function (newPerson, result) {
        sql.query(`INSERT INTO persona (id, nombre, paterno, materno, rfc, domicilio,localidad) VALUES (0,'${newPerson.nombre}', '${newPerson.paterno}', '${newPerson.materno}', '${newPerson.rfc}','${newPerson.direccion}','${newPerson.localidad}');`, newPerson, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};

Person.getPersonById = function (personId, result) {
        sql.query(`select * person where person.id ='${personId}'`, personId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });
};

Person.updateById = function(id, person, result){
  sql.query(`UPDATE persona SET nombre='${person.id}',materno='${person.materno}', paterno = '${person.paterno}',rfc='${person.rfc}',domicilio='${person.domicilio}',localidad='${person.localidad}' WHERE persona.id ='${id}';`, [person, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};

Person.remove = function(id, result){
     sql.query(`DELETE FROM persona WHERE persona.id ='${id}';`, id, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

/*
Person.ConsultRestaurants = function (result) {
        sql.query("Call Restaurant_CRUD_R_ALL", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('Restaurants : ', res);
                 result(null, res);
                }
            });
};*/

module.exports= Person;
