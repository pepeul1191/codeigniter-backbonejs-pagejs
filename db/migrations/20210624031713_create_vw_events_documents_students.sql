-- migrate:up

CREATE VIEW vw_events_documents_students AS 
  SELECT E.id AS event_id, ES.student_id, D.id AS document_id, D.name, D.description, D.url 
  FROM documents D 
  INNER JOIN events E ON D.event_id = E.id
  INNER JOIN events_students ES ON ES.event_id = E.id

-- migrate:down

DROP VIEW IF EXISTS vw_events_documents_students