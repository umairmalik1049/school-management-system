CREATE DATABASE IF NOT EXISTS SCHOOL_MANAGEMENT_SYSTEM;
USE SCHOOL_MANAGEMENT_SYSTEM;

DROP DATABASE SCHOOL_MANAGEMENT_SYSTEM;

# ---------- Class Table (1)

CREATE TABLE IF NOT EXISTS CLASS (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    class_level INT NOT NULL
);

DESCRIBE CLASS;
SELECT * FROM CLASS;
TRUNCATE TABLE CLASS;

# ---------- Teacher Table (2)

CREATE TABLE IF NOT EXISTS TEACHER (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    education VARCHAR(100),
    phone_no VARCHAR(20),
    address VARCHAR(200)
);

DESCRIBE TEACHER;
SELECT * FROM TEACHER;
TRUNCATE TABLE TEACHER;

# ---------- Subject Table (3)

CREATE TABLE IF NOT EXISTS SUBJECT (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    subject_class VARCHAR(50),
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES TEACHER(teacher_id)
);

DESCRIBE SUBJECT;
SELECT * FROM SUBJECT;
TRUNCATE TABLE SUBJECT;

SELECT * FROM SUBJECT JOIN TEACHER ON SUBJECT.teacher_id = TEACHER.teacher_id
ORDER BY SUBJECT.subject_id;

# ---------- Class_Subject Table (associative) (4)

CREATE TABLE IF NOT EXISTS CLASS_SUBJECT (
    class_subject_id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (class_id) REFERENCES CLASS(class_id),
    FOREIGN KEY (subject_id) REFERENCES SUBJECT(subject_id)
);

DESCRIBE CLASS_SUBJECT;
SELECT * FROM CLASS_SUBJECT;
TRUNCATE TABLE CLASS_SUBJECT;

# ---------- Student Table (5)

CREATE TABLE IF NOT EXISTS STUDENT (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    roll_no VARCHAR(50),
    age INT,
    date_of_birth DATE,
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES CLASS(class_id)
);

SELECT * FROM STUDENT
JOIN CLASS ON STUDENT.class_id = CLASS.class_id;

DESCRIBE STUDENT;
SELECT * FROM STUDENT;
TRUNCATE TABLE STUDENT;

DELETE FROM STUDENT
WHERE student_id = 1;

# ---------- Enrollment Table (associative) (6)

CREATE TABLE IF NOT EXISTS ENROLLMENT (
    enroll_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    enroll_date DATE,
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES SUBJECT(subject_id)
);

DESCRIBE ENROLLMENT;
SELECT * FROM ENROLLMENT;
TRUNCATE TABLE ENROLLMENT;

SELECT s.student_id, s.full_name, 
GROUP_CONCAT(DISTINCT CONCAT(" ", sub.subject_name) ORDER BY sub.subject_name) AS enrolled_subjects,
GROUP_CONCAT(DISTINCT CONCAT(" ", e.enroll_date) ORDER BY e.enroll_date) AS enrollment_dates
FROM STUDENT s
JOIN ENROLLMENT e ON s.student_id = e.student_id
JOIN SUBJECT sub ON e.subject_id = sub.subject_id
GROUP BY s.student_id, s.full_name;

SELECT s.student_id
FROM STUDENT s
LEFT JOIN ENROLLMENT e ON s.student_id = e.student_id
WHERE e.student_id IS NULL;

SELECT COUNT(*) AS total_unenrolled
FROM STUDENT s
LEFT JOIN ENROLLMENT e ON s.student_id = e.student_id
WHERE e.student_id IS NULL;

# ---------- Faculty Table (7)

CREATE TABLE IF NOT EXISTS FACULTY (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50),
    salary DECIMAL(10,2),
    phone_no VARCHAR(20),
    address VARCHAR(200)
);

DESCRIBE FACULTY;
SELECT * FROM FACULTY;
TRUNCATE TABLE FACULTY;





# --------- Auto Increment set to 1

ALTER TABLE CLASS AUTO_INCREMENT = 1;
ALTER TABLE TEACHER AUTO_INCREMENT = 1;
ALTER TABLE SUBJECT AUTO_INCREMENT = 1;
ALTER TABLE CLASS_SUBJECT AUTO_INCREMENT = 1;
ALTER TABLE STUDENT AUTO_INCREMENT = 1;
ALTER TABLE ENROLLMENT AUTO_INCREMENT = 1;
ALTER TABLE FACULTY AUTO_INCREMENT = 1;






# ------- Delete all tables

DROP TABLE FACULTY;
DROP TABLE ENROLLMENT;
DROP TABLE STUDENT;
DROP TABLE CLASS_SUBJECT;
DROP TABLE SUBJECT;
DROP TABLE TEACHER;
DROP TABLE CLASS;








# ------- Delete all data from all tables

SET SQL_SAFE_UPDATES = 0;
-- Step 1: Disable foreign key checks temporarily
SET foreign_key_checks = 0;
-- Step 2: Delete from dependent tables (child tables)
DELETE FROM ENROLLMENT;
DELETE FROM CLASS_SUBJECT;
DELETE FROM STUDENT;
DELETE FROM SUBJECT;
-- Step 3: Delete from the parent table
DELETE FROM TEACHER;
DELETE FROM CLASS;
DELETE FROM FACULTY;
-- Step 4: Re-enable foreign key checks
SET foreign_key_checks = 1;
SET SQL_SAFE_UPDATES = 1;

