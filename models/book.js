function Book(title, author, numPages){
    this.title = title, 
    this.author = author, 
    this.numPages = numPages,
    this.isRead =  false;
    
    this.info = () => {
        let read = this.isRead ? 'read' : 'not read yet'
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${read} `;
    } 
}

module.exports = Book;

