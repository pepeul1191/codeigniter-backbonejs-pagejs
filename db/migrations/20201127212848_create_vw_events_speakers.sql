-- migrate:up

CREATE VIEW vw_events_speakers AS 
  SELECT 
  ES.event_id AS event_id, E.name AS event_name, S.gender_id, S.names, S.last_names, S.picture_url
  FROM events_speakers ES 
  JOIN speakers S ON ES.speaker_id = S.id
  JOIN events E ON ES.event_id = E.id
  LIMIT 2000

-- migrate:down

DROP VIEW IF EXISTS vw_events_speakers