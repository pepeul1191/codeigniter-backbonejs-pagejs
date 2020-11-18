-- migrate:up

CREATE TABLE genders (
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name	VARCHAR(10) NOT NULL
);

-- migrate:down

DROP TABLE IF EXISTS genders;
