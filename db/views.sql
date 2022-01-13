DROP VIEW IF EXISTS vw_districts;

CREATE VIEW vw_districts AS
  SELECT DI.id AS id, CONCAT(DI.name, ', ', PR.name, ', ', DE.name) AS name
  FROM districts DI
  JOIN provinces PR ON DI.province_id = PR.id
  JOIN departments DE ON PR.department_id = DE.id
  LIMIT 2000;

DROP VIEW IF EXISTS vw_events_documents_students;

CREATE VIEW vw_events_documents_students AS 
  SELECT E.id AS event_id, ES.student_id, D.id AS document_id, D.name, D.description, D.url 
  FROM documents D 
  INNER JOIN events E ON D.event_id = E.id
  INNER JOIN events_students ES ON ES.event_id = E.id;


DROP VIEW IF EXISTS vw_events_speakers;

CREATE VIEW vw_events_speakers AS 
  SELECT 
  ES.event_id AS event_id, E.name AS event_name, S.gender_id, S.names, S.last_names, S.picture_url
  FROM events_speakers ES 
  JOIN speakers S ON ES.speaker_id = S.id
  JOIN events E ON ES.event_id = E.id
  LIMIT 2000;

DROP VIEW IF EXISTS vw_events_specialisms;

CREATE VIEW vw_events_specialisms AS
  SELECT E.specialism_id AS id, E.init_date, S.name FROM
  events E INNER JOIN specialisms S ON S.id = E.specialism_id;

DROP VIEW vw_events_students;
CREATE VIEW vw_events_students AS 
  SELECT IFNULL(ES.event_id ,9999) AS event_id, ET.id AS event_type_id, ET.name AS event_type_name, E.name AS event_name, E.description AS event_description, E.picture_url, E.pdf_base, S.id AS id, S.names, S.last_names, S.code, S.tuition, S.dni FROM 
  students S LEFT JOIN events_students ES  ON ES.student_id = S.id 
  INNER JOIN events E ON E.id = ES.event_id 
  INNER JOIN event_types ET ON E.event_type_id = ET.id 
  ORDER BY S.last_names;

DROP VIEW IF EXISTS vw_events_types;

CREATE VIEW vw_events_types AS
  SELECT E.id, E.code, E.name, E.hours, E.picture_url, E.init_date, E.init_hour, E.gift, E.description, E.event_type_id, ET.name AS event_type_name 
  FROM events E 
  JOIN event_types ET ON ET.id = E.event_type_id
  LIMIT 2000;

DROP VIEW IF EXISTS vw_events_videos_students;

CREATE VIEW vw_events_videos_students AS 
  SELECT E.id AS event_id, ES.student_id, V.id AS video_id, V.name, V.description, V.url 
  FROM videos V 
  INNER JOIN events E ON V.event_id = E.id
  INNER JOIN events_students ES ON ES.event_id = E.id;
