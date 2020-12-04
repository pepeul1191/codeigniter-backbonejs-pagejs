-- migrate:up

CREATE VIEW vw_events_specialisms AS
  SELECT E.specialism_id AS id, E.init_date, S.name FROM
  events E INNER JOIN specialisms S ON S.id = E.specialism_id;

-- migrate:down


DROP VIEW IF EXISTS vw_events_specialisms;
