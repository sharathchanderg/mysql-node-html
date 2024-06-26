const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library_03",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);

  createStudentsTable();
  createBooksTable();
  createReservationStatusTable();
  createBorrowsTable();
  createReservesTable();
  createFinesTable();
  createPaysTable();
});

function createStudentsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      student_id VARCHAR(20) NOT NULL
    )
  `;
  executeQuery(createTableQuery, "Students");
}

function createBooksTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
        book_id INT AUTO_INCREMENT PRIMARY KEY,
        category_id VARCHAR(255),
        title VARCHAR(255) NOT NULL,
        publication_date DATE NOT NULL,
        copies_owned INT NOT NULL,
        author VARCHAR(255) NOT NULL
    )
  `;
  executeQuery(createTableQuery, "Books");
}

function createReservationStatusTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS reservation_status (
        res_status_id INT AUTO_INCREMENT PRIMARY KEY,
        status_value VARCHAR(20) NOT NULL
    )
  `;
  executeQuery(createTableQuery, "Reservation Status");
}

function createBorrowsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS borrows (
        borrow_id INT AUTO_INCREMENT PRIMARY KEY,
        borrow_date DATE NOT NULL,
        returned_date DATE NOT NULL DEFAULT '1947-01-01',
        student_id INT,
        book_id INT,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (book_id) REFERENCES books(book_id)
    )
  `;
  executeQuery(createTableQuery, "Borrows");
}

function createReservesTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS reserves (
        reserve_id INT AUTO_INCREMENT PRIMARY KEY,
        reserve_date DATE NOT NULL,
        returned_date DATE NOT NULL DEFAULT '1947-01-01',
        student_id INT,
        book_id INT,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (book_id) REFERENCES books(book_id)
    )
  `;
  executeQuery(createTableQuery, "Reserves");
}

function createFinesTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS fines (
        fine_id INT AUTO_INCREMENT PRIMARY KEY,
        fine_date DATE NOT NULL,
        fine_amount INT NOT NULL,
        student_id INT,
        borrow_id INT,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (borrow_id) REFERENCES borrows(borrow_id)
    )
  `;
  executeQuery(createTableQuery, "Fines");
}

function createPaysTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS pays (
        payment_id INT AUTO_INCREMENT PRIMARY KEY,
        payment_date DATE NOT NULL,
        amount INT NOT NULL,
        student_id INT,
        fine_id INT,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (fine_id) REFERENCES fines(fine_id)
    )
  `;
  executeQuery(createTableQuery, "Pays");
}

function executeQuery(query, tableName) {
  db.query(query, (err, results, fields) => {
    if (err) {
      console.error(`Error creating ${tableName} table: ${err.stack}`);
      return;
    }
    console.log(`${tableName} table created successfully`);
  });
}

module.exports = {
  db,
};



// const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "library_01",
// });
 
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL: " + err.stack);
//     return;
//   }
//   console.log("Connected to MySQL as id " + db.threadId);

//   // Function to create 'students' table if it doesn't exist
//   createStudentsTable();
//   createBorrowsTable();
//   createFinesTable();
//   createPaysTable();
//   createReservationsTable();
//   createReservation_statusTable();
//   createBooksTable();
// });

// // Function to create 'students' table if it doesn't exist
// function createStudentsTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS students (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       student_id VARCHAR(20) NOT NULL
//     )
//   `;
//   db.query(createTableQuery, (err, results, fields) => {
//     if (err) {
//       console.error("Error creating students table: " + err.stack);
//       return;
//     }
//     console.log("Students table created successfully");
//   });
// }
// // book_id, category_name, title, publication_date, copies_owned, author
// // id INT AUTO_INCREMENT PRIMARY KEY,
// // book_id VARCHAR(255) NOT NULL,
// // category_name VARCHAR(255) NOT NULL,
// // title VARCHAR(255) NOT NULL,
// // publication_date VARCHAR(255) NOT NULL,
// // copies_owned TEXT NOT NULL,
// // author VARCHAR(255) NOT NULL

// function createBooksTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS books (
//         book_id VARCHAR(225) PRIMARY KEY,
//         category_id VARCHAR(255),
//         title VARCHAR(255) NOT NULL,
//         publication_date DATE NOT NULL,
//         copies_owned INT NOT NULL,
//         author VARCHAR(255) NOT NULL
//     )
//   `;

//   db.query(createTableQuery, (err, results, fields) => {
//     if (err) {
//       console.error("Error creating students table: " + err.stack);
//       return;
//     }
//     console.log("Books table created successfully");
//   });
// }

// function createReservation_statusTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS reservation_status (
//         res_status_id VARCHAR(20) NOT NULL,
//         status_value VARCHAR(20) NOT NULL,
//         PRIMARY KEY (res_status_id)
//     )
//   `;

//   db.query(createTableQuery, (err, results, fields) => {
//     if (err) {
//       console.error("Error creating students table: " + err.stack);
//       return;
//     }
//     console.log("Reservation status table created successfully");
//   });
// }

// function createBorrowsTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS borrows (
//         borrow_id VARCHAR(20) NOT NULL,
//         borrow_date DATE NOT NULL,
//         returned_date DATE NOT NULL DEFAULT '1947-01-01',
//         student_id INT,  -- Change data type to INT to match primary key in students table
//         book_id INT,     -- Change data type to INT to match primary key in books table
//         PRIMARY KEY (borrow_id),
//         FOREIGN KEY (student_id) REFERENCES students(id),
//         FOREIGN KEY (book_id) REFERENCES books(book_id)
//     )
//   `;

//   db.query(createTableQuery, (err, results, fields) => {
//     if (err) {
//       console.error("Error creating students table: " + err.stack);
//       return;
//     }
//     console.log("Borrows table created successfully");
//   });
// }

// function createReservationsTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS reserves (
//         reserve_id VARCHAR(20) NOT NULL,  -- Change to reserve_id to avoid conflicts with borrow_id
//         reserve_date DATE NOT NULL,
//         returned_date DATE NOT NULL DEFAULT '1947-01-01',
//         student_id INT,  -- Change data type to INT to match primary key in students table
//         book_id INT,     -- Change data type to INT to match primary key in books table
//         PRIMARY KEY (reserve_id),
//         FOREIGN KEY (student_id) REFERENCES students(id),
//         FOREIGN KEY (book_id) REFERENCES books(book_id)
//     )
//   `;

//   db.query(createTableQuery, (err, results, fields) => {
//     if (err) {
//       console.error("Error creating students table: " + err.stack);
//       return;
//     }
//     console.log("Reserves table created successfully");
//   });
// }

// function createFinesTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS fines (
//         fine_id VARCHAR(20) NOT NULL,
//         fine_date DATE NOT NULL,
//         fine_amount INT NOT NULL,
//         student_id INT,    -- Change data type to INT to match primary key in students table
//         borrow_id VARCHAR(20),  -- Borrow ID may be a VARCHAR, assuming it's the same as borrows table
//         PRIMARY KEY (fine_id),
//         FOREIGN KEY (student_id) REFERENCES students(id),
//         FOREIGN KEY (borrow_id) REFERENCES borrows(borrow_id)  -- Reference the correct column
//     )
//   `;

//   db.query(createTableQuery, (err, results, fields) => {
//     if (err) {
//       console.error("Error creating students table: " + err.stack);
//       return;
//     }
//     console.log("Fines table created successfully");
//   });
// }

// function createPaysTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS pays (
//         payment_id VARCHAR(20) NOT NULL,
//         payment_date DATE NOT NULL,
//         amount INT NOT NULL,
//         student_id INT,   -- Change data type to INT to match primary key in students table
//         fine_id VARCHAR(20),   -- Fine ID may be a VARCHAR, assuming it's the same as fines table
//         PRIMARY KEY (payment_id),
//         FOREIGN KEY (student_id) REFERENCES students(id),
//         FOREIGN KEY (fine_id) REFERENCES fines(fine_id)  -- Reference the correct column
//     )
//   `;

//   db.query(createTableQuery, (err, results, fields) => {
//     if (err) {
//       console.error("Error creating students table: " + err.stack);
//       return;
//     }
//     console.log("Pays table created successfully");
//   });
// }

// module.exports = {
//   createStudentsTable,
//   createBooksTable,
//   createReservationsTable,
//   createFinesTable,
//   createBorrowsTable,
//   db,
// };
