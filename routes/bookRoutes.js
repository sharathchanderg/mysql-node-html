const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Routes
router.get("/", bookController.getAllBooks);
router.get("/add", bookController.getAddBookForm);
router.post("/add", bookController.addBook);
router.get("/edit/:book_id", bookController.getEditBookForm);
router.post("/edit/:book_id", bookController.editBook);
router.get("/delete/:id", bookController.deleteBook);

module.exports = router;
