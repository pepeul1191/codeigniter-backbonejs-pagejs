-- migrate:up

CREATE TABLE specialisms_students(
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	student_id	INT,
  specialism_id	INT,
  FOREIGN KEY(student_id) REFERENCES students ( id ) ON DELETE CASCADE,
  FOREIGN KEY(specialism_id) REFERENCES specialisms ( id ) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS specialisms_students;