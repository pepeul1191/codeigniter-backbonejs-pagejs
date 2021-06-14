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

---

Fuentes:

+ https://github.com/pepeul1191/codeigniter-boilerplate
