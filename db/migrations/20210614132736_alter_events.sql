-- migrate:up

ALTER TABLE events 
ADD upload_path VARCHAR(20) 
AFTER code;

-- migrate:down

ALTER TABLE events 
DROP upload_path;