document.addEventListener('DOMContentLoaded', () => {
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('dark-mode');
    });

    const addBookModal = document.getElementById('addBookModal');
    const addBookForm = document.getElementById('addBookForm');
    const bookContainer = document.getElementById('bookContainer');
    const editModal = document.getElementById('editModal');
    const editBookForm = document.getElementById('editBookForm');
    let currentEditCard;

    // Show modal when clicking on "Add New Book" card
    const addNewBookCard = document.querySelector('.book-card.add-new-book');
    addNewBookCard.addEventListener('click', () => {
        addBookModal.style.display = 'block';
    });

    // Close the modal when clicking on the close button (x)
    const closeModal = document.querySelector('.modal .close');
    closeModal.addEventListener('click', () => {
        addBookModal.style.display = 'none';
    });

    // Close the edit modal when clicking on the close button (x)
    const closeEditModal = document.querySelector('.modal .close-edit');
    closeEditModal.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Add new book when form is submitted
    addBookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get form values
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const coverUrl = document.getElementById('coverUrl').value;
        const read = document.getElementById('read').checked;

        // Create a new book card element
        const newBookCard = document.createElement('div');
        newBookCard.classList.add('book-card');


        // HTML for the new book card
        newBookCard.innerHTML = `
            <div class="book-cover">
                <img src="${coverUrl}" alt="Book Cover">
            </div>
            <div class="book-details">
                <p class="title">Title: ${title}</p>
                <p class="author">Author: ${author}</p>
                <p class="pages">Pages: ${pages}</p>
                <p class="read">Read: 
                    <label class="toggle">
                        <input type="checkbox" class="read-toggle" ${read ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </p>
                
                <br>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Append the new book card to the book container
        bookContainer.appendChild(newBookCard);

        // Clear form fields
        addBookForm.reset();

        // Close the modal
        addBookModal.style.display = 'none';
    });

    // Event delegation for dynamically added read toggle checkboxes, edit, and delete buttons
    bookContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('read-toggle')) {
            const bookCard = event.target.closest('.book-card');
            const readStatus = bookCard.querySelector('.read');
            readStatus.textContent = `Read: ${event.target.checked ? 'Yes' : 'No'}`;
        }
    });

    bookContainer.addEventListener('click', (event) => {
        const bookCard = event.target.closest('.book-card');

        if (event.target.classList.contains('edit-btn')) {
            // Open the edit modal and fill in the current details
            currentEditCard = bookCard;
            const title = bookCard.querySelector('.title').textContent.replace('Title: ', '');
            const author = bookCard.querySelector('.author').textContent.replace('Author: ', '');
            const pages = bookCard.querySelector('.pages').textContent.replace('Pages: ', '');
            const read = bookCard.querySelector('.read-toggle').checked;

            document.getElementById('editTitle').value = title;
            document.getElementById('editAuthor').value = author;
            document.getElementById('editPages').value = pages;
            document.getElementById('editCoverUrl').value = bookCard.querySelector('img').src;
            document.getElementById('editRead').checked = read;

            editModal.style.display = 'block';
        }

        if (event.target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this book?')) {
                bookCard.remove();
            }
        }
    });

    // Event delegation for read toggle checkboxes
    bookContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains('read-toggle')) {
        const bookCard = event.target.closest('.book-card');
        const readStatus = bookCard.querySelector('.read');
        readStatus.textContent = `Read: ${event.target.checked ? 'Yes' : 'No'}`;
    }
    });

    // Edit book when form is submitted
    editBookForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form values
        const title = document.getElementById('editTitle').value;
        const author = document.getElementById('editAuthor').value;
        const pages = document.getElementById('editPages').value;
        const coverUrl = document.getElementById('editCoverUrl').value;
        const read = document.getElementById('editRead').checked;

        // Update the book card with new values
        currentEditCard.querySelector('.title').textContent = `Title: ${title}`;
        currentEditCard.querySelector('.author').textContent = `Author: ${author}`;
        currentEditCard.querySelector('.pages').textContent = `Pages: ${pages}`;
        currentEditCard.querySelector('.book-cover img').src = coverUrl;
        currentEditCard.querySelector('.read-toggle').checked = read;

        // Update the read status text
        const readStatus = currentEditCard.querySelector('.read');
        readStatus.textContent = `Read: ${read ? 'Yes' : 'No'}`;

        // Close the modal
        editModal.style.display = 'none';
    });

    // Example books array
    const exampleBooks = [
        {
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            pages: 310,
            coverUrl: 'https://m.media-amazon.com/images/I/71sR56IWUHL._AC_UF1000,1000_QL80_.jpg'
        },
        {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            pages: 281,
            coverUrl: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg'
        },
        {
            title: '1984',
            author: 'George Orwell',
            pages: 328,
            coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1k7QNP_48y1nNMkXTZxtAejkB_fIkV1ipg&s'
        },
        {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            pages: 180,
            coverUrl: 'https://m.media-amazon.com/images/I/71V1cA2fiZL._AC_UF1000,1000_QL80_.jpg'
        },
        {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            pages: 279,
            coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmgl4C7pGNH673jTyx2NLHhprvdNr1MwUEmg&s'
        }
    ];

    // Function to add example books to the book container
    function addExampleBooks() {
        exampleBooks.forEach(book => {
            const newBookCard = document.createElement('div');
            newBookCard.classList.add('book-card');
            newBookCard.innerHTML = `
                <div class="book-cover">
                    <img src="${book.coverUrl}" alt="Book Cover">
                </div>
                <div class="book-details">
                    <p class="title">Title: ${book.title}</p>
                    <p class="author">Author: ${book.author}</p>
                    <p class="pages">Pages: ${book.pages}</p>
                    <p class="read">Read: 
                        <label class="toggle">
                            <input type="checkbox" class="read-toggle">
                            <span class="slider"></span>
                        </label>
                    </p>
                    
                    <br>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            bookContainer.appendChild(newBookCard);
        });
    }

    // Call the function to add example books when the page loads
    addExampleBooks();

    // Search books in library
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', function() {
        if (searchInput.style.display === 'none' || searchInput.style.display === '') {
            searchInput.style.display = 'block';
            searchInput.focus();
        } else {
            searchInput.style.display = 'none';
        }
    });

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const books = document.querySelectorAll('.book-card:not(.add-new-book)');
        books.forEach(book => {
            const title = book.querySelector('.title').textContent.toLowerCase();
            const author = book.querySelector('.author').textContent.toLowerCase();
            if (title.includes(query) || author.includes(query)) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });
    });

    // Optionally, hide search input when losing focus
    searchInput.addEventListener('blur', function() {
        searchInput.style.display = 'none';
    });
 

    // JavaScript to display the range of years in the copyright notice
    const copyrightYearElement = document.getElementById('copyright-year');
    const startYear = 2024;
    const currentYear = new Date().getFullYear();
    const yearRange = (startYear === currentYear) ? currentYear : `${startYear} - ${currentYear}`;
    copyrightYearElement.textContent = yearRange;
});
