-- migrate:up

DROP VIEW vw_events_students;
CREATE VIEW vw_events_students AS 
  SELECT IFNULL(ES.event_id ,9999) AS event_id, E.name AS event_name, E.description AS event_description, E.picture_url, S.id AS id, S.names, S.last_names, S.code, S.tuition, S.dni FROM 
  students S LEFT JOIN events_students ES  ON ES.student_id = S.id 
  INNER JOIN events E ON E.id = ES.event_id
  ORDER BY S.last_names;

-- migrate:down

DROP VIEW vw_events_students;
CREATE VIEW vw_events_students AS 
  SELECT IFNULL(ES.event_id ,9999) AS event_id, S.id AS id, S.names, S.last_names, S.code, S.tuition, S.dni FROM 
  students S LEFT JOIN events_students ES  ON
  ES.student_id = S.id 
  ORDER BY S.last_names;
  