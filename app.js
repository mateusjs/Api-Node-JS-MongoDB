const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config')

//middlewares
app.use(cors());
app.use(bodyParser.json());


//Importar rotas
const postsRoute = require('./routes/posts');

//lembrar que quando usando app.use('/externo', postsRoute) na url vai ter que ser localhost:3000/externo + 
//a rota dentro do arquivo que está sendo importado, nesse caso o posts.js logo localhost:3000/externo/teste
app.use('/externo',postsRoute);

//porta para 
app.listen(3000);

//conectar com db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('connection to db suscefull'));
