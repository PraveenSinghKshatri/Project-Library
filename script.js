const myLibrary = [];


//Functions
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    };
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}


// Function to display books on the page
function displayBooks() {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = ''; // Clear previous content

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const bookInfo = document.createElement('p');
        bookInfo.classList.add('book-info');
        bookInfo.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? 'read' : 'not read yet'}`;

        bookCard.appendChild(bookInfo);
        bookContainer.appendChild(bookCard);
    });
}



// Manually adding some books for demonstration
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 279, true);
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, false);



//myLibrary.forEach(book => console.log(book.info()));
for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i].info());
}


// Call the displayBooks function to initially display the books
displayBooks();