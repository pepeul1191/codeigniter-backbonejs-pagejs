-- migrate:up

CREATE TABLE students (
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code	INT NOT NULL,
  tuition	INT,
  dni	VARCHAR(8) NOT NULL,
	names	VARCHAR(50) NOT NULL,
  last_names	VARCHAR(50) NOT NULL,
  email	VARCHAR(50),
  phone	VARCHAR(20),
  picture_url	VARCHAR(100),
  address VARCHAR(120),
  district_id	INT,
  FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS students;