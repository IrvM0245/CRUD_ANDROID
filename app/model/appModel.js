var mysql  = require('mysql');
var sql;

var Person = function(person){
    this.id = person.id;
    this.nombre = person.nombre;
    this.materno = person.materno;
    this.paterno = person.paterno;
    this.rfc = person.rfc;
    this.domicilio = person.domicilio;
    this.localidad = person.localidad;
};

function conexion(){
        sql = mysql.createConnection({
        host     : 'us-cdbr-iron-east-02.cleardb.net',
        user     : 'b54cebd94c131a',
        password : '785b23e4',
        database : 'heroku_d6c3f5493729dde'
      });
      
      sql.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
      
        console.log('connected as id ' + sql.threadId);
      });

}
function desconexion(){
    sql.end(function(err) {
        // The connection is terminated now
      });
}

//var sql = require('./db.js');

//Restaurant object constructor


Person.Mensaje = function (result)  {
	result('Hello world!');
};

Person.getAllPerson = function (result) {
    conexion();
    sql.query("Select * from persona", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('Personas: ', res);
             result(null, res);
            }

        });
        desconexion();
};

Person.createPerson = function (newPerson, result) {
    conexion();
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
            desconexion();
};

Person.getPersonById = function (personId, result) {
    conexion();
        sql.query(`select * person where person.id ='${personId}'`, personId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });
            desconexion();
};

Person.updateById = function(id, person, result){
    conexion();
  sql.query(`UPDATE persona SET nombre='${person.id}',materno='${person.materno}', paterno = '${person.paterno}',rfc='${person.rfc}',domicilio='${person.domicilio}',localidad='${person.localidad}' WHERE persona.id ='${id}';`, [person, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
            desconexion();
};

Person.remove = function(id, result){
    conexion();
     sql.query(`DELETE FROM persona WHERE persona.id ='${id}';`, id, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
            desconexion();
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
