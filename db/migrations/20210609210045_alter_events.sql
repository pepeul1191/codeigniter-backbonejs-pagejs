-- migrate:up

ALTER TABLE events 
ADD specialism_id INT 
AFTER event_type_id;

ALTER TABLE events 
ADD CONSTRAINT `fk_specialims_events_1`
  FOREIGN KEY (`specialism_id`)
  REFERENCES `classroom`.`specialisms` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- migrate:down

ALTER TABLE events 
DROP FOREIGN KEY fk_specialims_events_1;

ALTER TABLE events 
DROP specialism_id;