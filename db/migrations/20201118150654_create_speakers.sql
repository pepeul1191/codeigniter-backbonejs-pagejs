-- migrate:up

CREATE TABLE speakers (
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code	INT,
  tuition	INT,
  dni	VARCHAR(8) NOT NULL,
	names	VARCHAR(50) NOT NULL,
  last_names	VARCHAR(50) NOT NULL,
  email	VARCHAR(50),
  phone	VARCHAR(20),
  picture_url	VARCHAR(100),
  resume	TEXT,
  gender_id	INT,
  FOREIGN KEY (gender_id) REFERENCES genders(id) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS speakers;