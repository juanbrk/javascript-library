function Book(title, author, numPages, isRead = false){
    this.title = title, 
    this.author = author, 
    this.numPages = numPages,
    this.isRead =  isRead;
    
    this.info = () => {
        let read = this.isRead ? 'read' : 'not read yet'
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${read} `;
    } 
}
//elements
const albumRow = document.getElementById('albumRow');
const submitBtn = document.getElementById('submit-btn');


// variables
let myLibrary = [];

populateAlbum();

const removeBtnList = Array.from(document.querySelectorAll('button[class="btn btn-sm btn-danger"]'));


//events
submitBtn.addEventListener('click', ()  => createNewBook());

function addBookToLibrary(newBook){
    myLibrary.push(newBook);
}

/**
 * When the user clicks 'Remove' Button on book card, DOM element has to be removed as well as
 * the book that it relates to inside myLibrary
 * @param {Object} buttonPressed Remove Button that has been presed
 */
function removeBook(buttonPressed){
    const cardElementToRemove = buttonPressed.offsetParent.offsetParent;
    const bookToRemoveId = cardElementToRemove.dataset.bookId;
    const bookToRemoveIndex = myLibrary.findIndex( book => book.id == bookToRemoveId );
    //TODO: ask for confirmation
    myLibrary.splice(bookToRemoveIndex, 1);

    cardElementToRemove.remove(); 
}

/**
 * In order to target the apropiate card to remove from DOM when deleting a book
 * I'll generate a UUID kind-of ID that will be stored in its parent element dataset
 */
function createUniqueId(){
    var dateTime = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(char) {
        var r = (dateTime + Math.random()*16)%16 | 0;
        dateTime = Math.floor(dateTime/16);
        return (char=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}




function populateAlbum(){
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

    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        const bookRender = renderBook(book);
        albumRow.appendChild(bookRender);
    }
}

function createCardElement(){
    return createElementWithClass('div', ['card', 'mb-4', 'shadow-sm']);
}

/**
 * adds a new div that will store the book card
 */
function createColElement(){
    return createElementWithClass('div', ["col-md-4"]);
}

function createCardFooter(book){
    let cardFooter = createElementWithClass('div', ['d-flex',  'justify-content-between', 'align-items-center']);
    let footerBtnGroup = createElementWithClass('div', ['btn-group']);
    
    let editBtn = createElementWithClass('button', ['btn', 'btn-sm', 'btn-outline-primary']);
    editBtn.textContent = 'edit';
    editBtn.setAttribute('type','button');

    let viewBtn = createElementWithClass('button', ['btn', 'btn-sm', 'btn-outline-secondary']);
    viewBtn.textContent = 'view';
    viewBtn.setAttribute('type','button');
    
    let btnToRemoveBook = createElementWithClass('button', ['btn','btn-sm', 'btn-danger']);
    btnToRemoveBook.textContent = 'Remove';

    let pagesText = createElementWithClass('small', ['text-muted', 'text-decoration-none']);
    pagesText.textContent = `${book.numPages} Pages`;

    let btnGroup = appendChild(footerBtnGroup, [editBtn, viewBtn]);
    let footer = appendChild(cardFooter, [btnGroup, btnToRemoveBook]);

    return footer;

}

/**
 * 
 * @param {String} elementTag html <tag>
 * @param {*} classes Array
 */
function createElementWithClass(elementTag, classes){
    let newElement = document.createElement(`${elementTag}`);
    for (let i = 0; i < classes.length; i++) {
        newElement.classList.add(`${classes[i]}`);
    }

    return newElement;

}

function validateFields( bookTitle, bookAuthor, bookPages ){
    let emptyString = '';
    let faultyField = '';    
    let isValid = true;
    if (emptyString===bookTitle ){
        isValid = false;
        faultyField = 'title';
    } 
    
    if ( emptyString===bookAuthor && isValid) {
        isValid = false;
        faultyField = 'author';
    }
    
    if ( isValid) {
        //validate page numbers field input
        isValid =  emptyString===bookPages ? false : validateNumbersOnlyField(bookPages) ;
        faultyField = isValid ? '' : 'pages';
    }

    return faultyField;

}

/**
 * For form fields that are type=text but meant to be for numbers (4ex: page numbers)
 * checks if only valid [0-9] characters have been entered
 * 
 * @param {String} inputValue field text value
 */
function validateNumbersOnlyField(inputValue){
    const regex = /[0-9]|\./;
    return regex.test(inputValue);    
}

/**
 * User can add new books to library by pressing the '+ add a button'  Button
 * and we have to create it and display it properly
 */
function createNewBook(){
    let bookTitle = document.getElementById('book-title').value;
    let bookAuthor = document.getElementById('book-author').value;
    let bookPages = document.getElementById('book-pages').value;
    // read as in 'I have read this book'. !read as in 'do you like to read?' English parafernalia
    let readBook = document.getElementById('read-book-check').checked;

    const faultyField = validateFields(bookTitle,bookAuthor, bookPages);
    let areFieldsValid = faultyField.length == 0;

    if (!areFieldsValid){
        alert(`Please provide a valid value for ${faultyField}`);
    } else {
        let aBook = new Book(bookTitle, bookAuthor, Number(bookPages), readBook);
        addBookToLibrary(aBook);
        // LO DE ABAJO NO ESTARÁ POR SIEMPRE AQUI ------------------------------
        // Reemplazar por un metodo que renderice nuevamente la colección entera y no sólo 
        //este único libro
        const bookCard = renderBook(aBook);
        albumRow.appendChild(bookCard);
        // LO DE ARRIBA NO ESTARÁ POR SIEMPRE AQUI ------------------------------

        //scroll view to focus view on new book
        scrollToFocusOnAddedBook(bookCard)
        clearFields();
    }
}

function scrollToFocusOnAddedBook(newBookCard){
    let bookId = newBookCard.id;
    let anchor = document.querySelector(`[id='${bookId}']`); 
    anchor. scrollIntoView();
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

function clearFields(){
    document.getElementById("new-book-form").reset();
}

/**
 * creates book card and displays it 
 * 
 * @param {Object} book book to render
 */
function renderBook(book){
    const bookRender = createColElement();
    const cardElement = createCardElement();
    const cardBody = createCard(book);
    cardElement.appendChild(cardBody);
    bookRender.appendChild(cardElement);
    // bind book in array to book card in order to facilitate book removal 
    const bookId = createUniqueId();
    book.id = bookId;
    bookRender.dataset.bookId = `${bookId}`;
    bookRender.id = (book.numPages).toString();

    // provide remove-btn with functionality
    // THIS IS SO CUMBERSOME AND HARD TO READ+
    let removeCardBtn = bookRender.lastChild.lastChild.lastElementChild.lastElementChild;
    removeCardBtn.addEventListener('click', element => removeBook(element.currentTarget))
    return bookRender;
}

function createCard(book){
        
    let cardBody = createElementWithClass('div', ['card-body']);
    let cardTitle = createElementWithClass('p', ['card-text', 'text-center']); 
    let cardAuthor = createElementWithClass('p', ['card-text', 'text-center']); 
    let cardPages = createElementWithClass('p', ['card-text', 'text-center', 'text-muted']); 
    
    let footer = createCardFooter(book);
    
    cardTitle.textContent = `Title: ${book.title}`
    cardAuthor.textContent = `Author: ${book.author}`
    cardPages.textContent = `Pages: ${book.numPages}`

    let card = appendChild(cardBody, [cardTitle, cardAuthor, cardPages, footer]);
    
    return card;

}





