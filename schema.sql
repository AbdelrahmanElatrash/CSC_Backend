

DROP TABLE IF EXISTS user_credentials ;
CREATE TABLE user_credentials (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    role VARCHAR(255)

);

DROP TABLE IF EXISTS subjects ,
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    new_pass_mark VARCHAR(255) NOT NULL UNIQUE
    
);


DROP TABLE IF EXISTS student_subjects ;
CREATE TABLE student_subjects(
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES user_credentials(id),
    subject_id INTEGER REFERENCES subjects(id)
);
 



