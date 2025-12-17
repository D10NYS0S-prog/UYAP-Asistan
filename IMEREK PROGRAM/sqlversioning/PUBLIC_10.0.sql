alter table PUBLIC."evraklar" alter column if exists "ana_dosyaId" CHARACTER VARYING(500);
        
TRUNCATE TABLE PUBLIC."versioning";
INSERT INTO PUBLIC."versioning" ("version") VALUES ( 10.0 );
