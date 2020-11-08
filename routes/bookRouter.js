/*eslint-disable no-param-reassign */

const express = require('express');

function routes(Book) {
  const booksRouter = express.Router();

  //REST
  booksRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      //console.log(book);
      //salvar book database
      book.save();
      return res.status(201).json(book);
    })

    .get((req, res) => {
      //const response = {hello: 'This is my API'};
      //inserir busca genero
      //{query} exemplo de destructuring makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
      //const {query} = req;
      const query = {};
      //http://localhost:4000/api/books?genre=Fantasy
      if(req.query.genre) {
        query.genre = req.query.genre;
      }
      //mostrar lista livros
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        } 
        //else {
          return res.json(books);
        //}
      });
      //res.json(response);
    })

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
      res.json(book);
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
        })
      })
    
    //faz o update de um unico parametro, ex mudar read: true
    .path((req, res) => {
      const { book } = req;

      if (req.body._id) {
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      req.body.save((err) => {
        if(err) {
          return res.send(err);
        }
        return res.json(book);
      })
    })

    .delete ((req, res) => {
      req.book.remove((err) => {
        if(err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      })
    })
    
    return booksRouter;
  }

module.exports = routes;