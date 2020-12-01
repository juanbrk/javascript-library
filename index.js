const Book = require('./models/book')

let myLibrary = [];

function addBookToLibrary(newBook){
    myLibrary.push(newBook);
}

let aBook = new Book('Harry Potter', 'J.K. Rowling', 845);

addBookToLibrary(aBook);
