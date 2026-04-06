const express = require('express');
const app = express();

app.use(express.json());

// Sample database (in-memory)
let books = [];

// GET API - Fetch all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST API - Add a new book
app.post('/books', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(book);
    res.status(201).json({
        message: "Book added successfully",
        book: book
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});