USE school_management;

#--------- Inserting into Class Table

INSERT INTO CLASS (class_name, class_level)
VALUES
('Primary', 6),
('Primary', 7),
('Primary', 8),
('Matric', 9),
('Matric', 10),
('Intermediate', 11),
('Intermediate', 12);

#--------- Inserting into Teacher Table

INSERT INTO TEACHER (full_name, education, phone_no, address)
VALUES
('Ali Ahmad', 'MSc Mathematics', '0300-1111111', 'Lahore'),
('Fatima Khan', 'MA English', '0301-2222222', 'Karachi'),
('Usman Ali', 'MSc Physics', '0302-3333333', 'Islamabad'),
('Sara Malik', 'MSc Chemistry', '0303-4444444', 'Rawalpindi');

#--------- Inserting into Subject Table

INSERT INTO SUBJECT (subject_name, subject_class, teacher_id)
VALUES
('English', 'Compulsory', 2),       -- Taught by Fatima (teacher_id=2)
('Math', 'Compulsory', 1),          -- Taught by Ali (teacher_id=1)
('Physics', 'Science', 3),          -- Taught by Usman (teacher_id=3)
('Chemistry', 'Science', 4),        -- Taught by Sara (teacher_id=4)
('Biology', 'Science', 3),          -- Taught by Usman (teacher_id=3)
('Islamiat', 'Compulsory', 2),      -- Taught by Fatima (teacher_id=2)
('Pakistan Studies', 'Compulsory', 1);

#--------- Inserting into Class_Subject Table

INSERT INTO CLASS_SUBJECT (class_id, subject_id)
VALUES
-- Class 6 (class_id=1)
(1, 1), (1, 2), (1, 6), (1, 7),
-- Class 7 (class_id=2)
(2, 1), (2, 2), (2, 6), (2, 7),
-- Class 8 (class_id=3)
(3, 1), (3, 2), (3, 6), (3, 7),
-- Class 9 (class_id=4)
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7),
-- Class 10 (class_id=5)
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7),
-- Class 11 (class_id=6)
(6, 1), (6, 3), (6, 4), (6, 5), (6, 7),
-- Class 12 (class_id=7)
(7, 1), (7, 3), (7, 4), (7, 5), (7, 7);

#--------- Inserting into Student Table

INSERT INTO STUDENT (full_name, roll_no, age, date_of_birth, class_id)
VALUES
('Ayesha Ali', '9A-01', 14, '2010-05-15', 4),   -- Class 9
('Bilal Khan', '9A-02', 15, '2009-03-10', 4),  -- Class 9
('Zainab Iqbal', '10B-03', 16, '2008-07-22', 5), -- Class 10
('Hassan Javed', '12C-04', 18, '2006-01-12', 7); -- Class 12

#--------- Inserting into Enrollment Table

INSERT INTO ENROLLMENT (student_id, subject_id, enroll_date)
VALUES
-- Ayesha (student_id=1) in Class 9 => English(1), Math(2), Physics(3)
(1, 1, '2023-08-01'),
(1, 2, '2023-08-01'),
(1, 3, '2023-08-02'),
-- Bilal (student_id=2) in Class 9 => English(1), Math(2), Biology(5)
(2, 1, '2023-08-01'),
(2, 2, '2023-08-01'),
(2, 5, '2023-08-03'),
-- Zainab (student_id=3) in Class 10 => English(1), Math(2), Physics(3), Chemistry(4)
(3, 1, '2023-08-01'),
(3, 2, '2023-08-01'),
(3, 3, '2023-08-02'),
(3, 4, '2023-08-02'),
-- Hassan (student_id=4) in Class 12 => English(1), Physics(3), Chemistry(4), Biology(5)
(4, 1, '2023-08-01'),
(4, 3, '2023-08-01'),
(4, 4, '2023-08-01'),
(4, 5, '2023-08-01');

#--------- Inserting into Faculty Table

INSERT INTO FACULTY (full_name, role, salary, phone_no, address)
VALUES
('Rizwan Ahmed', 'Principal', 80000.00, '0300-5555555', 'Lahore'),
('Nida Ali', 'Accountant', 50000.00, '0301-6666666', 'Karachi'),
('Ahmed Hassan', 'Admin Staff', 40000.00, '0302-7777777', 'Rawalpindi');
