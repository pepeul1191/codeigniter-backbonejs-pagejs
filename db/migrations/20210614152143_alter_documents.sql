-- migrate:up

ALTER TABLE documents CHANGE COLUMN url url VARCHAR(100);

-- migrate:down

ALTER TABLE documents CHANGE COLUMN url url VARCHAR(50);
