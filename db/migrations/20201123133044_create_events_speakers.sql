-- migrate:up

CREATE TABLE events_speakers(
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	speaker_id	INT,
  event_id	INT,
  FOREIGN KEY(speaker_id) REFERENCES speakers ( id ),
  FOREIGN KEY(event_id) REFERENCES events ( id )
);

-- migrate:down

DROP TABLE IF EXISTS events_speakers;