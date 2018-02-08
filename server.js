'use strict';

const express = require('express');
var nodemailer = require('nodemailer'); 
var bodyParser = require('body-parser')
var smtpTransport = require('nodemailer-smtp-transport');
var cors = require('cors');
var fs = require('fs');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'youtec.ventas@gmail.com',
        pass:  'mono2008'
    }
  }
));

// App
const app = express();
app.use(cors()); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Enviador de mails\n');
});

app.post('/mailer', function(req, res) {
	var datos = req.body
	
	var nombre = datos.nombre
	var mail = datos.email
	var destinatario = datos.destinatario

	let mensaje = {
        to: destinatario,
        subject: 'Consultas formulario YOUTEC de ' + nombre + " - " + mail,
        text: datos.mensaje
      }

	transporter.sendMail(mensaje, (error, info) => {
        
        if (error) {
            res.send({success: false, msg: error.message});
            return;
        }
        res.send({success: true, msg: 'Mail cargado correctamente'});

        transporter.close();
      });
});


app.post('/valen-page', function (req,res) {


  var transporter_valen = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'traveltoeeuu@gmail.com',
        pass:  'policiadelaciudad'
      }
    }
  ));

  var html =  fs.readFileSync('mail_valen.html', 'utf8');

  var datos = req.body
  var plan = datos.plan
  var destinatario = datos.destinatario
  

  let mensaje = {
        from: 'traveltoeeuu@gmail.com',
        to: destinatario,
        subject: 'Inicio de petición de Visa para el plan ' + plan ,
        html: html,
        attachments: [{
              filename: 'DATOSPERSONALES.docx',
              path: 'DATOSPERSONALES.docx'
          }]
      }

  transporter_valen.sendMail(mensaje, (error, info) => {
        
        if (error) {
            res.send({success: false, msg: error.message});
            return;
        }
        res.send({success: true, msg: 'Mail cargado correctamente'});

        transporter.close();
      });

    return;

})




app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT} . 1`) ;