-- migrate:up

CREATE VIEW vw_events_students AS 
  SELECT IFNULL(ES.event_id ,9999) AS event_id, S.id AS id, S.names, S.last_names, S.code, S.tuition, S.dni FROM 
  students S LEFT JOIN events_students ES  ON
  ES.student_id = S.id 

-- migrate:down

DROP VIEW vw_events_students;
