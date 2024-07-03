document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('dark-mode');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const addBookModal = document.getElementById('addBookModal');
    const addBookForm = document.getElementById('addBookForm');
    const bookContainer = document.getElementById('bookContainer');

    // Show modal when clicking on "Add New Book" card
    const addNewBookCard = document.querySelector('.book-card.add-new-book');
    addNewBookCard.addEventListener('click', function () {
        addBookModal.style.display = 'block';
    });

    // Close the modal when clicking on the close button (x)
    const closeModal = document.querySelector('.modal .close');
    closeModal.addEventListener('click', function () {
        addBookModal.style.display = 'none';
    });

    // Add new book when form is submitted
    addBookForm.addEventListener('submit', function (event) {
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
                <p class="title">${title}</p>
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

    // Toggle read status when checkbox is clicked
    bookContainer.addEventListener('change', function (event) {
        if (event.target.classList.contains('read-toggle')) {
            const bookCard = event.target.closest('.book-card');
            const readStatus = bookCard.querySelector('.read');
            readStatus.textContent = `Read: ${event.target.checked ? 'Yes' : 'No'}`;
        }
    });
});
