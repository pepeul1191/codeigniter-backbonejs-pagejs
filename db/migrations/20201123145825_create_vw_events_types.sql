-- migrate:up

CREATE VIEW vw_events_types AS
  SELECT E.id, E.code, E.name, E.hours, E.picture_url, E.init_date, E.init_hour, E.gift, E.description, E.event_type_id, ET.name AS event_type_name 
  FROM events E 
  JOIN event_types ET ON ET.id = E.event_type_id
  LIMIT 2000

-- migrate:down

DROP VIEW IF EXISTS vw_events_types