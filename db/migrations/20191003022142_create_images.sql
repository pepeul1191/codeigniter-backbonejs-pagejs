-- migrate:up

CREATE TABLE 'images' (
	'id'	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	'name'	VARCHAR(54) NOT NULL
);

-- migrate:down

DROP TABLE IF EXISTS 'images';