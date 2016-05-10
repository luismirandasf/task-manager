var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);//CARGAMOS EL MÓDULO DE SOCKET Y CREAMOS VARIABLE
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cryp = require('crypto-js');

var bodyParser = require('body-parser'); //HOLAAAAA
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.use(express.static('public'));

app.get('/tareas', function(request, response){

  Tarea.find({},function(err,docs){ //BUSCAMOS TODOS LOS MENSAJES DE LA BASE DE DATOS (QUE SON LOS ÚLTIMOS 10) Y LOS MANDAMOS AL USUARIO QUE ACABA DE CONECTARSE.
      console.log('tareas a presentar: '+docs);
      //console.log(docs[0].usuario);
      response.json(docs);
  });
  
});

app.get('/tareas/:id', function(request, response){
  nota = {
    id: 24,
    user: {
      name: 'Pedro',
      username: 'pedritoJS'
    },
    header: 'Maecenas egestas',
    description: 'Proin sapien ipsum porta',
    content: 'Phasellus accumsan cursus velit. Praesent venenatis metus at tortor pulvinar varius. Maecenas malesuada. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Quisque id odio. Etiam ultricies nisi vel augue. Maecenas nec odio et ante tincidunt tempus. Etiam iaculis nunc ac metus. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi.'
  };
  response.json(nota);
});

app.post('/tareas', function(request, response){
  //response.json(notas);
  console.log(request.query);

  if (request.query.caducada != undefined){

    console.log("El _id vale: "+parseInt(request.query._id))

    Tarea.findByIdAndUpdate(request.query._id, {caducada: true}, function (err, tank) {
      //if (err) return handleError(err);
      //res.send(tank);
      console.log("entrada actualizada");
    });
    /*Tarea.update({_id: request.query._id},{caducada:true},function(err, NumAffected){
      console.log("tarea actualizada");
    });*/
    
  }else if (request.query.borrar != undefined){

    console.log("Estamos en borrar una nota");

    Tarea.remove({_id: request.query._id},function(err, NumAffected){
      console.log("tarea eliminada");
    });
  }else{

    guardarTareaDB(request.query);
  }
  
});

app.listen(9000);

mongoose.connect('mongodb://localhost/taskManager',function(err){

  if(!err){
    console.log('Se ha conectado a la base de datos del chat');
  }else{
    throw err;
  }
});

//GENERAMOS LA ESTRUCTURA DE LOS DATOS QUE VAMOS A INTRODUCIR EN LA BASE DE DATOS... TODOS LOS MENSAJES VAN A TENER AUTOR, MENSAJE Y FECHA.
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Tarea = new Schema({
  titulo: String,
  tarea: String,
  fecha: String,
  caducada: Boolean,
  borrada: Boolean
});
var Tarea = mongoose.model('Tarea', Tarea);

var Usuarios = new Schema({
  usuario: String,
  password: String
});
var Usuarios = mongoose.model('Usuarios', Usuarios);


Meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
Dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
function guardarTareaDB(datos){

  fecha = new Date;

  var tarea = new Tarea(
    {
    titulo: datos.titulo,
    tarea: datos.tarea,
    fecha: Dias[fecha.getDay()]+", "+fecha.getDate()+" de "+Meses[fecha.getMonth()]+" de "+fecha.getFullYear(),
    caducada: false,
    borrada: false
    }
  );
  //SEGUNDO GUARDAMOS EL MENSAJE EN LA BD Y SACAMOS LA INFO POR EL TERMINAL DEL SERVER
  tarea.save(function (err){
    if(!err){
      console.log('Tarea introducida');
    }else{
      console.log('Error al introducir tarea');
    }
  });
}






