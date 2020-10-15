-- migrate:up

CREATE TABLE specialisms (
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name	VARCHAR(45) NOT NULL
);

-- migrate:down

DROP TABLE IF EXISTS specialisms;
