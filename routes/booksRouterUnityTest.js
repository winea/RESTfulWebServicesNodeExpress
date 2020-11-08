/*eslint-disable no-param-reassign */
//Exemplo de TESTE UNITARIO com mocha, criado controller
const express = require('express');
const booksController = require('../controllers/bookController');

function routes(Book) {
  const booksRouter = express.Router();
  //controlador
  const controller = booksController(Book);
  
  booksRouter.route('/books')
    .post(controller.post)

    .get(controller.get)

    //middleware, fica entre cliente e servidor, next aponta
    //para a proxima fç que pode ser qualquer uma a seguir (get, put, delete, patch)
    booksRouter.use('/books/:bookId', (req, res, next) => {
      //http://localhost:4000/api/books/5f74e8a3970f8356615c4eb3
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          return res.send(err);
        } 
        if(book) {
          req.book = book;
          return next();
        }
        return res.sendStatus(404);
      });
    });

    //rota id
    booksRouter.route('/books/:bookId')
    .get((req, res) => {
      const returnBook = req.book.toJSON();

      returnBook.links = {};
      //tirar o espaço entre tipo de genero
      const genre = req.book.genre.replace('', '%20');
      returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${req.book.genre}`;
      res.json(returnBook);
      
      //res.json(req.book);
      //tratado pelo middleware acima
      // Book.findById(req.params.bookId, (err, book) => {
      //   if (err) {
      //     return res.send(err);
      //   } 
      //   return res.json(book);
      // });
    })

    //PUT atualizar
    .put((req, res) => {
      //tratado pelo middleware acima
      // Book.findById(req.params.bookId, (err, book) => {
      //   if (err) {
      //     return res.send(err);
      //   }
        const { book } = req;
        book.title = req.body.title;
        book.author = req.body.author; 
        book.genre = req.body.genre; 
        book.read = req.body.read; 
        //book.save();
        //return res.json(book);
        req.body.save((err) => {
          if(err) {
            return res.send(err);
          }
          return res.json(book);
        });
      })
    
    //faz o update de um unico parametro, ex mudar read: true
    .patch((req, res) => {
      const { book } = req;

      //eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        //eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value; //para cada chave update valor
      });

      req.body.save((err) => {
        if(err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })

    .delete ((req, res) => {
      req.book.remove((err) => {
        if(err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    })
    return booksRouter;
  }

module.exports = routes;