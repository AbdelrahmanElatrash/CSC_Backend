DROP TABLE IF EXISTS user_credentials
CREATE TABLE user_credentials (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL

);

DROP TABLE IF EXISTS student
CREATE TABLE student(
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    pass_mark VARCHAR(255) NOT NULL UNIQUE,
    student_mark VARCHAR(255) NOT NULL,
    id INT,
    FOREIGN KEY (user_id) REFERENCES user_credentials(id)
);
 


