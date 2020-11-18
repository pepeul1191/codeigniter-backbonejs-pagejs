-- migrate:up

CREATE TABLE event_types (
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name	VARCHAR(12) NOT NULL
);

-- migrate:down

DROP TABLE IF EXISTS event_types;
