-- migrate:up

CREATE TABLE videos (
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name	VARCHAR(50) NOT NULL,
  description	TEXT,
  url VARCHAR(50)
);

-- migrate:down

DROP TABLE IF EXISTS videos;