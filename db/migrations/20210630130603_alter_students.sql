-- migrate:up

ALTER TABLE students MODIFY code INT;

-- migrate:down

ALTER TABLE students MODIFY code INT NOT NULL;
