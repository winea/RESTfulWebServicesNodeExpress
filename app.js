const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//TESTE INTEGRADO comentar o banco de dados verdadeiro e usar este a seguir
  if(process.env.ENV === 'Test') {
    //const db = mongoose.connect('mongodb://localhost/bookAPI_Test')
  } else {
    //criar a conexao com o banco de dados
    const db = mongoose.connect('mongodb://localhost/bookAPI');
  }

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
//const bookRouter = express.Router();
// no final () faz com que execute
//const bookRouter = require('./routes/booksRouter')(Book);
const bookRouter = require('./routes/booksRouterUnityTest')(Book);
//const authorRouter = require('./routes/authorRouter')(Author);


//Body-Parser
app.use(bodyParser.urlencoded({extended: true}));
//pega JSON do body
app.use(bodyParser.json());

app.use('/api', bookRouter);  

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

//Para usar no teste de integração
module.exports = app;