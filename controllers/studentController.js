const {db} = require("../config/dbConfig")

// Function to get all students
exports.getAllStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, students) => {
    if (err) throw err;
    res.render("students", { view: "index", students: students });
  });
};

// Function to render add student form
exports.getAddStudentForm = (req, res) => {
  res.render("students", { view: "add" });
};

// Function to add a new student
exports.addStudent = (req, res) => {
  const { name, email, student_id } = req.body;
  const newStudent = { name, email, student_id };
  db.query("INSERT INTO students SET ?", newStudent, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
};

// Function to render edit student form
exports.getEditStudentForm = (req, res) => {
  const studentId = req.params.id;
  db.query(
    "SELECT * FROM students WHERE id = ?",
    studentId,
    (err, result) => {
      if (err) throw err;
      res.render("students", { view: "edit", student: result[0] });
    }
  );
};

// Function to edit a student
exports.editStudent = (req, res) => {
  const studentId = req.params.id;
  const { name, email, student_id } = req.body;
  db.query(
    "UPDATE students SET name = ?, email = ?, student_id = ? WHERE id = ?",
    [name, email, student_id, studentId],
    (err, result) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
};

// Function to delete a student
exports.deleteStudent = (req, res) => {
  const studentId = req.params.id;
  db.query(
    "DELETE FROM students WHERE id = ?",
    studentId,
    (err, result) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
};
