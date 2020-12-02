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

// variables
let myLibrary = [];
const albumRow = document.getElementById('albumRow');


function addBookToLibrary(newBook){
    myLibrary.push(newBook);
}

let aBook = new Book('Harry Potter', 'J.K. Rowling', 845, false);
addBookToLibrary(aBook);
aBook = new Book('Arianna Jenkins and Reverse-engineered asynchronous array ', 'Valentine Schneider', 97250, false);
addBookToLibrary(aBook);
aBook = new Book('Elyssa Kunze and Ergonomic directional alliance ', 'Clifford Beahan', 29846, true);
addBookToLibrary(aBook);
aBook = new Book('Junior Hintz and Seamless next generation implementation ', 'Keenan Mosciski', 53915, false);
addBookToLibrary(aBook);
aBook = new Book('Ernestine Krajcik and Robust client-driven hardware ', 'Luz Bradtke', 75661, false);
addBookToLibrary(aBook);
aBook = new Book('Tavares Wyman and Face to face global installation ', 'Esperanza Mraz', 33816, true);
addBookToLibrary(aBook);
aBook = new Book('Charlene Schulist and Networked local methodology ', 'Veronica Leannon', 21165, false);
addBookToLibrary(aBook);
aBook = new Book('Anahi Olson and Team-oriented multi-tasking open architecture ', 'Jordy Toy', 13603, false);
addBookToLibrary(aBook);
aBook = new Book('Jabari King and Digitized 24 hour encoding ', 'Barton Anderson', 87283, false);
addBookToLibrary(aBook);
aBook = new Book('Cecile Breitenberg and Sharable 5th generation internet solution ', 'Aimee Wunsch', 82643, false);
addBookToLibrary(aBook);
aBook = new Book('Vida Von and Persistent optimizing pricing structure ', 'Catherine Roberts', 17763, true);
addBookToLibrary(aBook);


function populateAlbum(){
    console.log(myLibrary.length)
    for (let i = 0; i < myLibrary.length; i++) {
        const colElement = document.createElement('div');
        const cardElement = document.createElement('div'); 

        colElement.classList.add("col-md-4");
        cardElement.classList.add("card", "mb-4", "shadow-sm");

        albumRow.appendChild(colElement);
        colElement.appendChild(cardElement)
        
        let book = myLibrary[i]

        let cardBody = createCard(book);
        cardElement.appendChild(cardBody);
    }
}

function createCardFooter(book){
    let cardFooter = document.createElement('div');
    cardFooter.classList.add('d-flex',  'justify-content-between', 'align-items-center');
    
    let footerBtnGroup = document.createElement('div');
    footerBtnGroup.classList.add('btn-group');

    let viewBtn = document.createElement('button');
    viewBtn.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    viewBtn.textContent = 'view';
    viewBtn.setAttribute('type','button');
    
    let editBtn = document.createElement('button')
    editBtn.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    editBtn.textContent = 'edit';
    editBtn.setAttribute('type','button');
    
    let pagesText = document.createElement('small');
    pagesText.classList.add('text-muted');
    pagesText.textContent = `${book.numPages} Pages`;

    let btnGroup = appendChild(footerBtnGroup, [editBtn, viewBtn]);
    // footerBtnGroup.innerHTML+= editBtn.outerHTML + viewBtn.outerHTML;
    let footer = appendChild(cardFooter, [btnGroup, pagesText]);

    return footer;

}

/**
 * append multiple child elements to one parent element.
 * @param {Object} parentElement element to append childs to
 * @param {Array} childs elements to be appended
 */
function appendChild(parentElement, childs){
    for (let i = 0; i < childs.length; i++) {
        parentElement.innerHTML += childs[i].outerHTML;        
    }
    return parentElement;
}

function createCard(book){
        
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let cardTitle = document.createElement('p');
    cardTitle.classList.add('card-text', 'text-center');

    let cardAuthor = document.createElement('p');
    cardAuthor.classList.add('card-text', 'text-center');
    
    let footer = createCardFooter(book);
    
    cardTitle.textContent = `Title: ${book.title}`
    cardAuthor.textContent = `Author: ${book.author}`

    let card = appendChild(cardBody, [cardTitle, cardAuthor, footer]);

    return card;

}

populateAlbum();



