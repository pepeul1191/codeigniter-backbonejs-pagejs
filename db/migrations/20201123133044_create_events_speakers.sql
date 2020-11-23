-- migrate:up

CREATE TABLE events_speakers(
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	speaker_id	INT,
  event_id	INT,
  FOREIGN KEY(speaker_id) REFERENCES speakers ( id ) ON DELETE CASCADE,
  FOREIGN KEY(event_id) REFERENCES events ( id ) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS events_speakers;