const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Routes
router.get("/", studentController.getAllStudents);
router.get("/add", studentController.getAddStudentForm);
router.post("/add", studentController.addStudent);
router.get("/edit/:id", studentController.getEditStudentForm);
router.post("/edit/:id", studentController.editStudent);
router.get("/delete/:id", studentController.deleteStudent);

module.exports = router;
