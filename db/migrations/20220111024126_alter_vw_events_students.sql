-- migrate:up

DROP VIEW vw_events_students;
CREATE VIEW vw_events_students AS 
  SELECT IFNULL(ES.event_id ,9999) AS event_id, ET.id AS event_type_id, ET.name AS event_type_name, E.name AS event_name, E.description AS event_description, E.picture_url, E.pdf_base, S.id AS id, S.names, S.last_names, S.code, S.tuition, S.dni FROM 
  students S LEFT JOIN events_students ES  ON ES.student_id = S.id 
  INNER JOIN events E ON E.id = ES.event_id 
  INNER JOIN event_types ET ON E.event_type_id = ET.id 
  ORDER BY S.last_names;

-- migrate:down

DROP VIEW vw_events_students;
CREATE VIEW vw_events_students AS 
  SELECT IFNULL(ES.event_id ,9999) AS event_id, E.name AS event_name, E.description AS event_description, E.picture_url, S.id AS id, S.names, S.last_names, S.code, S.tuition, S.dni FROM 
  students S LEFT JOIN events_students ES  ON ES.student_id = S.id 
  INNER JOIN events E ON E.id = ES.event_id
  ORDER BY S.last_names;
