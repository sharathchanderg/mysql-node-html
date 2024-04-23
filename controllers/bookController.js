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
  // const { category, name, publication, description, author } = req.body;
  const {
    book_id,
    category_id,
    title,
    publication_date,
    copies_owned,
    author,
  } = req.body;
  const newBook = {
    book_id,
    category_id,
    title,
    publication_date,
    copies_owned,
    author,
  };
  db.query("INSERT INTO books SET ?", newBook, (err, result) => {
    if (err) throw err;
    res.redirect("/books");
  });
};

exports.getEditBookForm = (req, res) => {
  const bookId = req.params.book_id;
  // console.log("bookId",bookId)
  db.query("SELECT * FROM books WHERE book_id = ?", bookId, (err, result) => {
    if (err) throw err;
    res.render("books", { view: "edit", book: result[0] });
  });
};

// exports.editBook = (req, res) => {
//   const id = req.params.id;
//   const {
    
//     category_id,
//     title,
//     publication_date,
//     copies_owned,
//     author,
//   } = req.body;
//   // const { category, name, publication, description, author } = req.body;
//   db.query(
//     "UPDATE books SET  category_id = ?, title = ?, publication_date = ?, copies_owned = ?, author = ? WHERE book_id = ?",
//     // "UPDATE books SET category = ?, name = ?, publication = ?, description = ?, author = ? WHERE id = ?",
//     // [category, name, publication, description, author, bookId],
//     [ category_id, title, publication_date, copies_owned, author, id],
//     (err, result) => {
//       if (err) throw err;
//       res.redirect("/books");
//     }
//   );
// };

exports.editBook = (req, res) => {
  const bookId = req.params.book_id; // Corrected to use 'book_id'
  const {
    category_id,
    title,
    publication_date,
    copies_owned,
    author,
  } = req.body;
  console.log(req.body)
  db.query(
    "UPDATE books SET category_id = ?, title = ?, publication_date = ?, copies_owned = ?, author = ? WHERE book_id = ?",
    [category_id, title, publication_date, copies_owned, author, bookId], // Use 'bookId' instead of 'id'
    (err, result) => {
      if (err) throw err;
      res.redirect("/books");
    }
  );
};

exports.deleteBook = (req, res) => {
  const bookId = req.params.id;
  db.query("DELETE FROM books WHERE book_id = ?", bookId, (err, result) => {
    if (err) throw err;
    res.redirect("/books");
  });
};

// exports.addBook = (req, res) => {
//   const { book_id, category_id, title, publication_date, copies_owned, author } = req.body;
//   const newBook = { book_id, category_name, title, publication_date, copies_owned, author };
//   db.query("INSERT INTO books SET ?", newBook, (err, result) => {
//     if (err) throw err;
//     res.redirect("/books");
//   });
// };
// exports.editBook = (req, res) => {
//   const id = req.params.id;
//   const { book_id, category_name, title, publication_date, copies_owned, author} = req.body;
//   db.query(
//     "UPDATE books SET book_id = ?, category_name = ?, title = ?, publication_date = ?, copies_owned = ?, author = ? WHERE id = ?",
//     [book_id, category_name, title, publication_date, copies_owned, author],
//     (err, result) => {
//       if (err) throw err;
//       res.redirect("/books");
//     }
//   );
// };

// exports.deleteBook = (req, res) => {
//   const book_id = req.params.id;
//   db.query("DELETE FROM books WHERE book_id = ?", book_id, (err, result) => {
//     if (err) throw err;
//     res.redirect("/books");
//   });
// };
