DROP SCHEMA IF EXISTS ESKI CASCADE;
alter table PUBLIC."taraflar" add if not exists "tcKimlikNo" BIGINT;
create index if not exists PUBLIC."taraflar_tcKimlikNo_index" on PUBLIC."taraflar" ("tcKimlikNo");
DROP INDEX if exists PUBLIC.evraklar_alt_dosyaNo_index;
DROP INDEX if exists PUBLIC.evraklar_alt_dosyaTur_index;
DROP INDEX if exists PUBLIC.evraklar_ggEvrakId_index;
DROP INDEX if exists PUBLIC.evraklar_gonderenDosyaNo_index;
DROP INDEX if exists PUBLIC.evraklar_gonderenSayi_index;
DROP INDEX if exists PUBLIC.evraklar_gonderenYerKisi_index;
DROP INDEX if exists PUBLIC.evraklar_isYetkili_index;
DROP INDEX if exists PUBLIC.taraflar_adres_index;

TRUNCATE TABLE PUBLIC."versioning";
INSERT INTO PUBLIC."versioning" ("version") VALUES ( 8.0 );
