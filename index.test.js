// const { test, describe, it, expect, jest} = require('@jest/globals')

const  BookHandler = require('./index').BookHandler;

console.log('bookHandler', BookHandler)
// describe('Book class', () => {


test('Should init a book', () => {
  const book = new BookHandler();
  expect(book.nextPage)
});

// })