-- migrate:up

CREATE VIEW vw_districts AS
  SELECT DI.id AS id, CONCAT(DI.name, ', ', PR.name, ', ', DE.name) AS name
  FROM districts DI
  JOIN provinces PR ON DI.province_id = PR.id
  JOIN departments DE ON PR.department_id = DE.id
  LIMIT 2000

-- migrate:down

DROP VIEW IF EXISTS vw_districts