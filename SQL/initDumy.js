const { dbQuery } = require("./dbFuncs.js");

const insertData = async () => {
  const q1 = `ALTER TABLE CLASS AUTO_INCREMENT = 1`;
  const q2 = `ALTER TABLE TEACHER AUTO_INCREMENT = 1`;
  const q3 = `ALTER TABLE SUBJECT AUTO_INCREMENT = 1`;
  const q4 = `ALTER TABLE CLASS_SUBJECT AUTO_INCREMENT = 1`;
  const q5 = `ALTER TABLE STUDENT AUTO_INCREMENT = 1`;
  const q6 = `ALTER TABLE ENROLLMENT AUTO_INCREMENT = 1`;
  const q7 = `ALTER TABLE FACULTY AUTO_INCREMENT = 1`;

  const classData = `INSERT INTO CLASS (class_name, class_level)
    VALUES
    ('Primary', 6),
    ('Primary', 7),
    ('Primary', 8),
    ('Matric', 9),
    ('Matric', 10),
    ('Intermediate', 11),
    ('Intermediate', 12)`;

  const teacherData = `INSERT INTO TEACHER (full_name, education, phone_no, address)
    VALUES
    ('Ali Ahmad', 'MSc Mathematics', '0300-1111111', 'Lahore'),
    ('Fatima Khan', 'MA English', '0301-2222222', 'Karachi'),
    ('Usman Ali', 'MSc Physics', '0302-3333333', 'Islamabad'),
    ('Sara Malik', 'MSc Chemistry', '0303-4444444', 'Rawalpindi')`;

  const subjectData = `INSERT INTO SUBJECT (subject_name, subject_class, teacher_id)
    VALUES
    ('English', 'Compulsory', 2),
    ('Math', 'Compulsory', 1),
    ('Physics', 'Science', 3),
    ('Chemistry', 'Science', 4),
    ('Biology', 'Science', 3),
    ('Islamiat', 'Compulsory', 2),
    ('Pakistan Studies', 'Compulsory', 1)`;

  const classSubjectData = `INSERT INTO CLASS_SUBJECT (class_id, subject_id)
    VALUES
    (1, 1), (1, 2), (1, 6), (1, 7),
    (2, 1), (2, 2), (2, 6), (2, 7),
    (3, 1), (3, 2), (3, 6), (3, 7),
    (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7),
    (5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7),
    (6, 1), (6, 3), (6, 4), (6, 5), (6, 7),
    (7, 1), (7, 3), (7, 4), (7, 5), (7, 7)`;

  const studentData = `INSERT INTO STUDENT (full_name, roll_no, age, date_of_birth, class_id)
    VALUES
    ('Ali Hamza', '9A-01', 14, '2010-05-15', 4),
    ('Bilal Khan', '9A-02', 15, '2009-03-10', 4),
    ('Farooq Mumtaz', '10B-03', 16, '2008-07-22', 5),
    ('Muhammad Junaid', '12C-04', 18, '2006-01-12', 7)`;

  const enrollmentData = `INSERT INTO ENROLLMENT (student_id, subject_id, enroll_date)
    VALUE
    (1, 1, '2023-08-01'),
    (1, 2, '2023-08-01'),
    (1, 3, '2023-08-01'),
    (2, 1, '2023-08-02'),
    (2, 2, '2023-08-02'),
    (2, 5, '2023-08-02'),
    (3, 1, '2023-08-03'),
    (3, 2, '2023-08-03'),
    (3, 3, '2023-08-03'),
    (3, 4, '2023-08-03'),
    (4, 1, '2023-08-04'),
    (4, 3, '2023-08-04'),
    (4, 4, '2023-08-04'),
    (4, 5, '2023-08-04')`;

  const facultyData = `INSERT INTO FACULTY (full_name, role, salary, phone_no, address)
    VALUES
    ('Rizwan Ahmed', 'Principal', 80000.00, '0300-5555555', 'Lahore'),
    ('Nida Ali', 'Accountant', 50000.00, '0301-6666666', 'Karachi'),
    ('Ahmed Hassan', 'Admin Staff', 40000.00, '0302-7777777', 'Rawalpindi')`;

  try {
    await dbQuery(q1);
    await dbQuery(q2);
    await dbQuery(q3);
    await dbQuery(q4);
    await dbQuery(q5);
    await dbQuery(q6);
    await dbQuery(q7);

    console.log("Table Auto Increment Reset Successfully...!");

    await dbQuery(classData);
    await dbQuery(teacherData);
    await dbQuery(subjectData);
    await dbQuery(classSubjectData);
    await dbQuery(studentData);
    await dbQuery(enrollmentData);
    await dbQuery(facultyData);

    console.log("Data Inserted Successfully...!");
  } catch (err) {
    console.log("Error in inserting data : ", err);
  }
};

module.exports = { insertData };
