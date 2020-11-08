//npm t
require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');
const { requests } = require('sinon');
const { after } = require('mocha');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
  it('should allow a book to be posted and return read _it', (done) =>{
    const bookPost = {title: 'My Book', author: "Jon", genre: 'Fanfic'};

    agent.post('/api/books')
    .send(bookPost)
    .expect(200)
    .end((err, result) => {
      result.body.read.should.not.equal('false');
      result.body.should.have.property('_id');
      
    });

    afterEach((done) => {
      Book.deleteMany({}).exec();
      done();
    });

    after((done) => {
      mongoose.connection.close();
      app.server.close(done());
    })

  })
})