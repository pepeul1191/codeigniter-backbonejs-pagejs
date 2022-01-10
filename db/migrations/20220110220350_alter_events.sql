-- migrate:up

ALTER TABLE events 
ADD pdf_base VARCHAR(70) 
AFTER specialism_id;

-- migrate:down

ALTER TABLE events 
DROP pdf_base;