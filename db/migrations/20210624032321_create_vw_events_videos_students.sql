-- migrate:up

CREATE VIEW vw_events_videos_students AS 
  SELECT E.id AS event_id, ES.student_id, V.id AS video_id, V.name, V.description, V.url 
  FROM videos V 
  INNER JOIN events E ON V.event_id = E.id
  INNER JOIN events_students ES ON ES.event_id = E.id

-- migrate:down

DROP VIEW IF EXISTS vw_events_videos_students