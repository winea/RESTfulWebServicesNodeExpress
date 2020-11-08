function bookController(Book) {

  function post(req, res) {
    //tudo que estava no post
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }  
    book.save();
    res.status(201)
    return res.json(book);
  }

   function get(req, res) {
    const query = {};
    //http://localhost:4000/api/books?genre=Fantasy
    if(req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      } 
      //criar um link com url customizada para cada livro
      const returnBook = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links.self = `http: //${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      
      return res.json(returnBook);
    });
  }
  
  return{ post, get}
}

module.exports = bookController;