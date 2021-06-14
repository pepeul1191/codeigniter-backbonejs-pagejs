-- migrate:up

CREATE TABLE documents (
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name	VARCHAR(50) NOT NULL,
  description	TEXT,
  url VARCHAR(50),
  event_id	INT,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS documents;