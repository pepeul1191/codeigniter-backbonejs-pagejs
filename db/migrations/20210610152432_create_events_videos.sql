-- migrate:up

CREATE TABLE events_videos(
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	video_id	INT,
  event_id	INT,
  FOREIGN KEY(video_id) REFERENCES videos ( id ) ON DELETE CASCADE,
  FOREIGN KEY(event_id) REFERENCES events ( id ) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS events_videos;