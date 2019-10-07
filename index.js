const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');

// Route to query by Title
bookRouter.route('/books').get((req, res) => {
    const query = {};
    if (req.query.title) {
        query.title = req.query.title;
    }
    Book.find(query, (err, books) => {
        if (err) {
            return res.send(err);
        }

        return res.json(books);
    });
});

//Fetch by _ID of MongoDB
bookRouter.route('/books/:bookID').get((req, res) => {
    Book.findById(req.params.bookID, (err, book) => {
        if (err) {
            return res.send(err);
        }

        return res.json(book);
    });
});

app.use('/api', bookRouter);


app.get('/', (req, res) => {
    res.send('Welcome to my MEAN API!');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});