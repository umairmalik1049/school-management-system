const { dbQuery } = require("./dbFuncs.js");

const defTable = async () => {
  const classTB = `CREATE TABLE IF NOT EXISTS CLASS (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    class_level INT NOT NULL
    )`;

  const teacherTB = `CREATE TABLE IF NOT EXISTS TEACHER (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    education VARCHAR(100),
    phone_no VARCHAR(20),
    address VARCHAR(200)
    )`;

  const subjectTB = `CREATE TABLE IF NOT EXISTS SUBJECT (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    subject_class VARCHAR(50),
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES TEACHER(teacher_id)
    )`;

  const classSubjectTB = `CREATE TABLE IF NOT EXISTS CLASS_SUBJECT (
    class_subject_id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (class_id) REFERENCES CLASS(class_id),
    FOREIGN KEY (subject_id) REFERENCES SUBJECT(subject_id)
    )`;

  const studentTB = `CREATE TABLE IF NOT EXISTS STUDENT (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    roll_no VARCHAR(50),
    age INT,
    date_of_birth DATE,
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES CLASS(class_id)
    )`;

  const enrollmentTB = `CREATE TABLE IF NOT EXISTS ENROLLMENT (
    enroll_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    enroll_date DATE,
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
    FOREIGN KEY (subject_id) REFERENCES SUBJECT(subject_id)
    )`;

  const facultyTB = `CREATE TABLE IF NOT EXISTS FACULTY (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50),
    salary DECIMAL(10,2),
    phone_no VARCHAR(20),
    address VARCHAR(200)
    )`;

  try {
    await dbQuery(classTB);
    await dbQuery(teacherTB);
    await dbQuery(subjectTB);
    await dbQuery(classSubjectTB);
    await dbQuery(studentTB);
    await dbQuery(enrollmentTB);
    await dbQuery(facultyTB);

    console.log("Tables Created Successfully or Already Exists...!");
  } catch (err) {
    console.log("Error in Creating Tables: ", err);
  }
};

defTable();
