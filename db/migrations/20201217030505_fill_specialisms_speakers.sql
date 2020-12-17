-- migrate:up

INSERT INTO `specialisms_speakers` (`id`, `speaker_id`, `specialism_id`) VALUES
(1, 1, 5),
(2, 2, 5),
(3, 3, 5),
(4, 4, 5),
(5, 5, 5),
(6, 6, 5),
(7, 7, 5),
(8, 8, 5),
(9, 9, 5),
(10, 10, 10),
(11, 11, 8),
(12, 12, 4),
(13, 13, 4);

-- migrate:down

TRUNCATE `specialisms_speakers`;