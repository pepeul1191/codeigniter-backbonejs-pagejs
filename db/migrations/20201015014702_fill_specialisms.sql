-- migrate:up

INSERT INTO specialisms (id, name) VALUES
  (1, 'Derechos Humanos'),
  (2, 'Derecho Internacional'),
  (3, 'Derecho Corporativo o Empresarial'),
  (4, 'Derecho Civil'),
  (5, 'Derecho Penal'),
  (6, 'Derecho Mercantil'),
  (7, 'Derecho Tributario'),
  (8, 'Derecho Laboral');

-- migrate:down

TRUNCATE specialisms;