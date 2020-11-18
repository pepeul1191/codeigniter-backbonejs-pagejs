-- migrate:up

CREATE TABLE specialisms_speakers(
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	speaker_id	INT,
  specialism_id	INT,
  FOREIGN KEY(speaker_id) REFERENCES speakers ( id ) ON DELETE CASCADE,
  FOREIGN KEY(specialism_id) REFERENCES specialisms ( id ) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS specialisms_speakers;