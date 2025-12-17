alter table PUBLIC."evraklar" drop column if exists "ana_dosyaId_tam";
alter table PUBLIC."evraklar" drop column if exists "dosyaId_tam";
alter table PUBLIC."tebligatlar" drop column if exists "dosyaId_tam";
alter table PUBLIC."taraflar" drop column if exists "dosyaId_tam";
alter table PUBLIC."harcTahsilatToplam" drop column if exists "dosyaId_tam";
alter table PUBLIC."harcTahsilatAyrinti" drop column if exists "dosyaId_tam";
alter table PUBLIC."durusmalar" drop column if exists "dosyaId_tam";
alter table PUBLIC."dosya_ayrintilar" drop column if exists "dosyaId_tam";
alter table PUBLIC."borclu_bilgileri" drop column if exists "dosyaId_tam";

TRUNCATE TABLE PUBLIC."versioning";
INSERT INTO PUBLIC."versioning" ("version") VALUES ( 7.0 );