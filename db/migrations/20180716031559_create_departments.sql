-- migrate:up

CREATE TABLE departments (
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name	VARCHAR(30) NOT NULL
);

-- migrate:down

DROP TABLE IF EXISTS departments;
