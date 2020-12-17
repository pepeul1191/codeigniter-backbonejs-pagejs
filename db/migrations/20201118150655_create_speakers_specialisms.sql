-- migrate:up

CREATE TABLE specialisms_speakers(
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	speaker_id	INT,
  specialism_id	INT,
  FOREIGN KEY(speaker_id) REFERENCES speakers ( id ),
  FOREIGN KEY(specialism_id) REFERENCES specialisms ( id )
);

-- migrate:down

DROP TABLE IF EXISTS specialisms_speakers;