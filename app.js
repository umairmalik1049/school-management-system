const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const dotenv = require("dotenv");
dotenv.config();

// ----------- Database Connection
require("./SQL/dbConnection.js");
const { dbQuery } = require("./SQL/dbFuncs.js");
require("./SQL/defTable.js");
const { insertData } = require("./SQL/initDumy.js");
const { delData } = require("./SQL/delData.js");

// ----------- Setting up packages
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ----------- Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ------ Index GET Route

app.get("/", async (req, res) => {
  const query1 = "SELECT COUNT(*) FROM TEACHER";
  const query2 = "SELECT COUNT(*) FROM STUDENT";
  const query3 = "SELECT COUNT(*) FROM CLASS";
  const query4 = "SELECT COUNT(*) FROM SUBJECT";
  const query5 = "SELECT COUNT(*) FROM ENROLLMENT";
  const query6 = "SELECT COUNT(*) FROM FACULTY";

  try {
    const teacherCount = await dbQuery(query1);
    const studentCount = await dbQuery(query2);
    const classCount = await dbQuery(query3);
    const subjectCount = await dbQuery(query4);
    const enrollmentCount = await dbQuery(query5);
    const facultyCount = await dbQuery(query6);

    const data = {
      teacherCount: teacherCount[0]["COUNT(*)"],
      studentCount: studentCount[0]["COUNT(*)"],
      classCount: classCount[0]["COUNT(*)"],
      subjectCount: subjectCount[0]["COUNT(*)"],
      enrollmentCount: enrollmentCount[0]["COUNT(*)"],
      facultyCount: facultyCount[0]["COUNT(*)"],
    };

    res.render("index.ejs", { data });
  } catch (err) {
    res.status(500).send("Database Error...!");
  }
});

// ------ Students GET Route

app.get("/students", async (req, res) => {
  const query =
    "SELECT * FROM STUDENT JOIN CLASS ON STUDENT.class_id = CLASS.class_id";

  try {
    const students = await dbQuery(query);
    res.render("read/students.ejs", { students });
  } catch (err) {
    res.status(500).send("Database Error...!");
  }
});

// ------ Teachers GET Route

app.get("/teachers", async (req, res) => {
  const query = "SELECT * FROM TEACHER";

  try {
    const teachers = await dbQuery(query);
    res.render("read/teachers.ejs", { teachers });
  } catch (err) {
    res.status(500).send("Database Error...!");
  }
});

// ------ Subjects GET Route

app.get("/subjects", async (req, res) => {
  const query =
    "SELECT * FROM SUBJECT JOIN TEACHER ON SUBJECT.teacher_id = TEACHER.teacher_id";

  try {
    const subjects = await dbQuery(query);
    res.render("read/subjects.ejs", { subjects });
  } catch (err) {
    res.status(500).send("Database Error...!");
  }
});

// ------ Classes GET Route

app.get("/classes", async (req, res) => {
  const query = "SELECT * FROM CLASS";

  try {
    const classes = await dbQuery(query);
    res.render("read/classes.ejs", { classes });
  } catch (err) {
    res.status(500).send("Database Error...!");
  }
});

// ------ Enrollment GET Route

app.get("/enrollments", async (req, res) => {
  const query =
    "SELECT enroll_id, enroll_date, STUDENT.full_name, SUBJECT.subject_name FROM ENROLLMENT JOIN STUDENT ON ENROLLMENT.student_id = STUDENT.student_id JOIN SUBJECT ON ENROLLMENT.subject_id = SUBJECT.subject_id";

  try {
    const enrollments = await dbQuery(query);
    res.render("read/enrollments.ejs", { enrollments });
  } catch (err) {
    res.status(500).send("Database Error...!");
  }
});

// ------ Faculty GET Route

app.get("/faculty", async (req, res) => {
  const query = "SELECT * FROM FACULTY";

  try {
    const faculty = await dbQuery(query);
    res.render("read/faculty.ejs", { faculty });
  } catch (err) {
    res.status(500).send("Database Error...!");
  }
});

// ------ Insert Dummy Data

app.get("/insert/data", async (req, res) => {
  try {
    await insertData();
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error in Inserting Data...!");
  }
});

// ------ Drop All Dummy Data

app.get("/drop/data", async (req, res) => {
  try {
    await delData();
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error in Deleting Data...!");
  }
});

// ------ Students POST Route & Form GET Route

app.get("/new", async (req, res) => {
  const query1 = "SELECT * FROM CLASS";

  try {
    const classes = await dbQuery(query1);
    res.render("create/addStudent.ejs", { classes });
  } catch (err) {
    res.status(500).send("Database Error...!");
  }
});

app.post("/students", async (req, res) => {
  const std = req.body.student;

  const query = `INSERT INTO STUDENT (full_name, roll_no, age, date_of_birth, class_id) VALUES
  ('${std.fullName}',
  '${std.rollNo}',
  ${Number(std.age)},
  '${std.dob}',
  ${Number(std.classId)})`;

  try {
    await dbQuery(query);
    console.log("Student Added Successfully...!");
    res.redirect("/students");
  } catch (err) {
    res.status(500).send("Database Error...!");
  }
});

// ------------ Setting up Server

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
