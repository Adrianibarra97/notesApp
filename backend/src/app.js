const express = require('express');
const cors = require('cors');

const app = express();

/*
    settings: 
        configuraciones del servidor(nombre, puerto definido,
        motor de platillas, variables a usar en el sistema, etc)
*/ 
app.set('port',process.env.PORT || 4000);


/*
    middlewares: Son funciones que se ejecutan antes de que
    lleguen a las URLS.
    Vamos a utilizar cors para conectar dos servidores y puedan intercambiar
    datos.
*/
app.use(cors());
app.use(express.json());


// routes: Las rutas que nuestra app(usuario) puede visitar.
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));


module.exports = app;