-- migrate:up

CREATE TABLE events (
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name	VARCHAR(50) NOT NULL,
  hours	INT NOT NULL,
  picture_url	VARCHAR(100),
  init_date	DATETIME NOT NULL,
  init_hour	DATETIME NOT NULL,
  gift VARCHAR(40),
  description	TEXT,
  event_type_id	INT,
  FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS events;