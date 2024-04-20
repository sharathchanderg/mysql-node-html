const { db } = require("../config/dbConfig");

exports.getAllBooks = (req, res) => {
  db.query("SELECT * FROM books", (err, books) => {
    if (err) throw err;
    res.render("books", { view: "index", books: books });
  });
};

exports.getAddBookForm = (req, res) => {
  res.render("books", { view: "add" });
};

exports.addBook = (req, res) => {
  const { category, name, publication, description, author } = req.body;
  const newBook = { category, name, publication, description, author };
  db.query("INSERT INTO books SET ?", newBook, (err, result) => {
    if (err) throw err;
    res.redirect("/books");
  });
};

exports.getEditBookForm = (req, res) => {
  const bookId = req.params.id;
  db.query("SELECT * FROM books WHERE id = ?", bookId, (err, result) => {
    if (err) throw err;
    res.render("books", { view: "edit", book: result[0] });
  });
};

exports.editBook = (req, res) => {
  const bookId = req.params.id;
  const { category, name, publication, description, author } = req.body;
  db.query(
    "UPDATE books SET category = ?, name = ?, publication = ?, description = ?, author = ? WHERE id = ?",
    [category, name, publication, description, author, bookId],
    (err, result) => {
      if (err) throw err;
      res.redirect("/books");
    }
  );
};

exports.deleteBook = (req, res) => {
  const bookId = req.params.id;
  db.query("DELETE FROM books WHERE id = ?", bookId, (err, result) => {
    if (err) throw err;
    res.redirect("/books");
  });
};
