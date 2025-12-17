comment on column PUBLIC."dosyalar"."isNew" is null;

comment on column PUBLIC."dosyalar"."dosyaTurKod" is null;

alter table PUBLIC."dosyalar"
    add if not exists "isSorusturmaDosyasiIncelemeTalebiKabulEdilmis" BOOLEAN;

alter table PUBLIC."dosyalar"
    add if not exists "is_taraf_aktif" BOOLEAN default TRUE;

alter table PUBLIC."dosyalar"
    add if not exists "is_ayrinti_aktif" BOOLEAN default TRUE;

alter table PUBLIC."dosyalar"
    add if not exists "is_evrak_aktif" BOOLEAN default TRUE;

alter table PUBLIC."dosyalar"
    add if not exists "is_tahsilat_aktif" BOOLEAN default TRUE;

alter table PUBLIC."dosyalar"
    add if not exists "dosyaKapanisTarihi" TIMESTAMP WITH TIME ZONE;

create index if not exists PUBLIC."dosyalar_dosyaKapanisTarihi_index"
    on PUBLIC."dosyalar" ("dosyaKapanisTarihi");

create index if not exists PUBLIC."dosyalar_isSorusturmaDosyasiIncelemeTalebiKabulEdilmis_index"
    on PUBLIC."dosyalar" ("isSorusturmaDosyasiIncelemeTalebiKabulEdilmis");

create index if not exists PUBLIC."dosyalar_is_ayrinti_aktif_index"
    on PUBLIC."dosyalar" ("is_ayrinti_aktif");

create index if not exists PUBLIC."dosyalar_is_evrak_aktif_index"
    on PUBLIC."dosyalar" ("is_evrak_aktif");

create index if not exists PUBLIC."dosyalar_is_tahsilat_aktif_index"
    on PUBLIC."dosyalar" ("is_tahsilat_aktif");

create index if not exists PUBLIC."dosyalar_is_taraf_aktif_index"
    on PUBLIC."dosyalar" ("is_taraf_aktif");

alter table PUBLIC."ihaleler"
    add if not exists "tarihAraligi_1" TIMESTAMP WITH TIME ZONE;

-- column reordering is not supported PUBLIC."ihaleler"."tarihAraligi_1"

alter table PUBLIC."ihaleler"
    add if not exists "tarihAraligi_2" TIMESTAMP WITH TIME ZONE;


alter table PUBLIC."ihaleler"
    alter column if exists "eIlanDurumu" INTEGER;

drop index if exists PUBLIC."ihaleler_tarihAraligi__1_index";

alter table PUBLIC."ihaleler"
    drop column if exists "tarihAraligi__1";

create index if not exists PUBLIC."ihaleler_tarihAraligi__1_index"
    on PUBLIC."ihaleler" ("tarihAraligi_1");

drop index if exists PUBLIC."ihaleler_tarihAraligi__2_index";

alter table PUBLIC."ihaleler"
    drop column if exists "tarihAraligi__2";

create index if not exists PUBLIC."ihaleler_tarihAraligi__2_index"
    on PUBLIC."ihaleler" ("tarihAraligi_2");

TRUNCATE TABLE PUBLIC."versioning";
INSERT INTO PUBLIC."versioning" ("version") VALUES ( 5.0 );