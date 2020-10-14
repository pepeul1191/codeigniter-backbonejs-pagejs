-- migrate:up

CREATE TABLE districts(
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name	VARCHAR(30) NOT NULL,
  province_id INTEGER,
  FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE CASCADE
)

-- migrate:down

DROP TABLE IF EXISTS districts;
