-- migrate:up

INSERT INTO genders (id, name) VALUES
  (1, 'Masculino'),
  (2, 'Femenino'),
  (3, 'Otros');

-- migrate:down

TRUNCATE genders;