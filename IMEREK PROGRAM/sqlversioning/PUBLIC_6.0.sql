alter table PUBLIC."dosyalar" alter column if exists "hash" CHARACTER VARYING(500) not null;
TRUNCATE TABLE PUBLIC."versioning";
INSERT INTO PUBLIC."versioning" ("version") VALUES ( 6.0 );