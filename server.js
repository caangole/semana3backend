const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controllers/UserController');


//Instancia de Express
const app = express();
app.use(cors());
//   app.use((req, res, next) =>{
//      res.header("Access-Control-Allow-Origin", "*");
//      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//      res.header("Access-Control-Allow-Methods: GET, POST, DELETE");
//      next();
//  })


//middleware Morgan para detectar peticiones
app.use(morgan('dev'));
//con body parser podemos leer las respuestas en .JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//ruta api direccionada a través del enrutador: apiRouter
app.use('/api', apiRouter);

app.set('PORT', process.env.PORT || 3000);

app.get('/', function(req, res) {
    console.log("Conectado a la estructura base del backend");
    res.send("Conectado a la estructura base del backend");
});

app.listen(app.get('PORT'), () => {
    console.log(`Running on http://localhost:${app.get('PORT')}`)
})

module.exports = app;