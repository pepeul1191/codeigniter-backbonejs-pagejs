-- migrate:up

CREATE TABLE events_students(
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	student_id	INT,
  event_id	INT,
  FOREIGN KEY(student_id) REFERENCES students ( id ) ON DELETE CASCADE,
  FOREIGN KEY(event_id) REFERENCES events ( id ) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS events_students;