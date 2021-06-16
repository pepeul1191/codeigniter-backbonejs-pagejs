# CodeIgniter

Instalación de dependencias:

    $ composer install

Servidor de desarrollo

    $ composer start

### Migraciones

Migraciones con DBMATE - accesos:

    $ dbmate -d "db/migrations" -e "DB" new <<nombre_de_migracion>>
    $ dbmate -d "db/migrations" -e "DB" up
    $ dbmate -d "db/migrations" -e "DB" rollback

Video: 

    $ ffmpeg -i "Terceros 100k.mp4" -c:v libx265 -crf 28 -strict -2 output2.mp4

### FFMPEG en Windows

1. Enlace de descarga:

    https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z

2. Descomprimir

3. Añadir al path

### Dump y Restore Mysql

    $ mysqldump -u root -p classroom > db/classroom.sql
    $ mysql -u root -p classroom < db/classroom.sql

## Habilitar GROUP BY MySQL

    $ SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

En el hosting ya está habilitada está función.

## Querys de alumnos matriculados y no matriculados

No matriculados

```SQL
SELECT 
  T.event_id, T.id, T.name, T.dni, T.code, T.tuition 
FROM 
(
  SELECT 
    event_id, id, CONCAT(last_names, ", ", names) AS name, dni, code, tuition 
  FROM vw_events_students WHERE 
    (names LIKE "%a%" OR last_names LIKE "%a%") AND 
    (dni LIKE "%4%") AND 
    (tuition LIKE "%6%") AND 
    (event_id != 2)
) T
LEFT JOIN 
(
  SELECT 
    event_id, id, CONCAT(last_names, ", ", names) AS name, dni, code, tuition 
  FROM vw_events_students WHERE 
    (names LIKE "%a%" OR last_names LIKE "%a%") AND 
    (dni LIKE "%4%") AND 
    (tuition LIKE "%6%") AND 
    (event_id = 2)
) E
ON T.id = E.id  
WHERE E.id IS NULL
GROUP BY id ORDER BY name LIMIT 10 OFFSET 0;
```

Matriculados

```SQL
SELECT 
  event_id, id, CONCAT(last_names, ", ", names) AS name, dni, code, tuition 
FROM vw_events_students WHERE 
  (names LIKE "%a%" OR last_names LIKE "%a%") AND 
  (dni LIKE "%4%") AND 
  (tuition LIKE "%6%") AND 
  (event_id = 2) 
GROUP BY id ORDER BY name LIMIT 10 OFFSET 0;
```

---

Fuentes:

+ https://github.com/pepeul1191/codeigniter-boilerplate
+ https://stackoverflow.com/questions/4560471/how-to-exclude-rows-that-dont-join-with-another-table/4560613