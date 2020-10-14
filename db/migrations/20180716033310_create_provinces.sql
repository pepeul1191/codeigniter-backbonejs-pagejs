-- migrate:up

CREATE TABLE provinces(
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name	VARCHAR(30) NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
)

-- migrate:down

DROP TABLE IF EXISTS provinces;
