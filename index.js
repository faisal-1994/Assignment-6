const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let books = [];
let bookId = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;
  if (!title || !author) {
    res.status(400).json({ error: 'Title and author are required fields.' });
  } else {
    const newBook = {
      id: ++bookId,
      title,
      author,
      publishedDate,
    };
    books.push(newBook);
    res.json(newBook);
  }
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex === -1) {
    res.status(404).json({ error: 'Book not found.' });
  } else {
    books.splice(bookIndex, 1);
    res.json({ message: 'Book successfully deleted.' });
  }
});

app.listen(3000, function() {
    console.log("run successfully");
  });
