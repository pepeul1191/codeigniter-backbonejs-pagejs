-- migrate:up

CREATE TABLE events_documents(
	id	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	document_id	INT,
  event_id	INT,
  FOREIGN KEY(document_id) REFERENCES documents ( id ) ON DELETE CASCADE,
  FOREIGN KEY(event_id) REFERENCES events ( id ) ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS events_documents;