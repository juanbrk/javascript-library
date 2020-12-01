function Book(title, author, numPages){
    this.title = title, 
    this.author = author, 
    this.numPages = numPages,
    this.isRead =  false;
    // If set like this, calling console.log(book.info()) will display
    // The Hobbit by J.R.R Tolkien, 295 pages, read 
    this.info = () => {
        let read = this.isRead ? 'read' : 'not read yet'
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${read} `;
    } 
}

// When set like this this is what calling console.log(book.info()) looks like 
// undefined by undefined, undefined pages, not read yet 
Book.prototype.info = () => {
    let read = this.isRead ? 'read' : 'not read yet'
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${read} `;
}

const book = new Book('The Hobbit', 'J.R.R Tolkien', 295);
book.isRead = true;

console.log(book.info());