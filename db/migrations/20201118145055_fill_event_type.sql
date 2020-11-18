-- migrate:up

INSERT INTO event_types (id, name) VALUES
  (1, 'Curso'),
  (2, 'Diplomado');

-- migrate:down

TRUNCATE event_types;