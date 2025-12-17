alter table PUBLIC."evraklar"
    drop primary key;

alter table PUBLIC."evraklar"
    drop column if exists "hash";

UPDATE PUBLIC."evraklar" SET PUBLIC."evraklar"."anaEvrakId"=0 where PUBLIC."evraklar"."anaEvrakId" is null;

alter table PUBLIC."evraklar"
    alter column if exists "anaEvrakId" set not null;

alter table PUBLIC."evraklar"
    alter column if exists "anaEvrakId" set default 0;

drop index if exists PUBLIC."evraklar_ana_dosyaId_evrakId_birimEvrakNo_anaEvrakId_index";


alter table PUBLIC."evraklar"
    add constraint if not exists "evraklar_pk"
        primary key ("evrakId", "birimEvrakNo", "anaEvrakId", "dosyaId");

TRUNCATE TABLE PUBLIC."versioning";
INSERT INTO PUBLIC."versioning" ("version") VALUES ( 4.0 );
