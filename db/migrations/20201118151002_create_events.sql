-- migrate:up

CREATE TABLE events (
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name	VARCHAR(50) NOT NULL,
  hours	INT NOT NULL,
  picture_url	VARCHAR(100),
  init_date	DATE NOT NULL,
  init_hour	TIME NOT NULL,
  gift VARCHAR(40),
  description	TEXT,
  event_type_id	INT,
  code INT,
  specialism_id INT,
  FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE,
  FOREIGN KEY (specialism_id) REFERENCES specialisms(id) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS events;