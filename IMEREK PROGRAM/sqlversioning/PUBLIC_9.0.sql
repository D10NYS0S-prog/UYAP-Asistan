alter table PUBLIC."dosyalar"
	add if not exists "dosyaId" CHARACTER VARYING(500);
alter table PUBLIC."evraklar" alter column if exists "ana_dosyaId" CHARACTER VARYING(500);
UPDATE "dosyalar" SET "dosyaId"="hash";


alter table PUBLIC."borclu_bilgileri" drop constraint if exists "borclu_bilgileri_dosyalar_dosyaId_fk";
alter table PUBLIC."borclu_bilgileri"
	add constraint if not exists "borclu_bilgileri_dosyalar_hash_fk"
		foreign key ("dosyaId") references PUBLIC."dosyalar" ("hash")
			on update cascade on delete cascade;


alter table PUBLIC."dosya_ayrintilar" drop constraint if exists "dosya_ayrintilar_dosyalar_dosyaId_fk";
alter table PUBLIC."dosya_ayrintilar"
	add constraint if not exists "dosya_ayrintilar_dosyalar_hash_fk"
		foreign key ("dosyaId") references PUBLIC."dosyalar" ("hash")
			on update cascade on delete cascade;


alter table PUBLIC."evraklar" drop constraint if exists "evraklar_dosyalar_dosyaId_fk";
alter table PUBLIC."evraklar"
	add constraint if not exists "evraklar_dosyalar_hash_fk"
		foreign key ("ana_dosyaId") references PUBLIC."dosyalar" ("hash")
			on update cascade on delete cascade;


alter table PUBLIC."harcTahsilatAyrinti" drop constraint if exists "harcTahsilatAyrinti_dosyalar_dosyaId_fk";
alter table PUBLIC."harcTahsilatAyrinti"
	add constraint if not exists "harcTahsilatAyrinti_dosyalar_hash_fk"
		foreign key ("dosyaId") references PUBLIC."dosyalar" ("hash")
			on update cascade on delete cascade;


alter table PUBLIC."harcTahsilatToplam" drop constraint if exists "harcTahsilatToplam_dosyalar_dosyaId_fk";
alter table PUBLIC."harcTahsilatToplam"
	add constraint if not exists "harcTahsilatToplam_dosyalar_hash_fk"
		foreign key ("dosyaId") references PUBLIC."dosyalar" ("hash")
			on update cascade on delete cascade;

alter table PUBLIC."muhasebe" drop constraint if exists "muhasebe_dosyalar_dosyaId_fk";
alter table PUBLIC."muhasebe"
	add constraint if not exists "muhasebe_dosyalar_hash_fk"
		foreign key ("dosyaId") references PUBLIC."dosyalar" ("hash")
			on update cascade on delete cascade;

alter table PUBLIC."taraflar" drop constraint if exists "taraflar_dosyalar_dosyaId_fk";
alter table PUBLIC."taraflar"
	add constraint if not exists "taraflar_dosyalar_hash_fk"
		foreign key ("dosyaId") references PUBLIC."dosyalar" ("hash")
			on update cascade on delete cascade;

alter table PUBLIC."tebligatlar" drop constraint if exists "tebligatlar_dosyalar_dosyaId_fk";
alter table PUBLIC."tebligatlar"
	add constraint if not exists "tebligatlar_dosyalar_hash_fk"
		foreign key ("dosyaId") references PUBLIC."dosyalar" ("hash")
			on update cascade on delete cascade;




alter table PUBLIC."dosyalar"
    drop  column if exists "dosyaId";
DROP INDEX if exists PUBLIC."dosyalar_dosyaId_tam_index";

alter table PUBLIC."dosyalar" drop constraint if exists "dosyalar_dosyaId_tam_index";
alter table PUBLIC."dosyalar"
	add if not exists "is_borclu_aktif" INTEGER;
create index if not exists PUBLIC."dosyalar_is_borclu_aktif_index"
	on PUBLIC."dosyalar" ("is_borclu_aktif");


alter table PUBLIC."borclu_bilgileri" drop constraint if exists "borclu_bilgileri_pk";
alter table PUBLIC."borclu_bilgileri"
	add constraint if not exists "borclu_bilgileri_pk"
		primary key ("dosyaId", "kisiKurumId");

alter table PUBLIC."borclu_bilgileri"
	add if not exists "created_tarihi" TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP;
create index if not exists PUBLIC."borclu_bilgileri_created_tarihi_index"
	on PUBLIC."borclu_bilgileri" ("created_tarihi");

alter table PUBLIC."borclu_bilgileri"
	add if not exists "borclu_bilgileri_id" INTEGER auto_increment;
create index if not exists PUBLIC."borclu_bilgileri_borclu_bilgileri_id_index"
	on PUBLIC."borclu_bilgileri" ("borclu_bilgileri_id");

alter table PUBLIC."borclu_bilgileri"
    drop column if exists "type";

alter table PUBLIC."borclu_bilgileri"
    drop column if exists "alt_kalem";



alter table PUBLIC."durusmalar" alter column if exists "izinliHakimList" JSON;
alter table PUBLIC."durusmalar" alter column if exists "kayitId" BIGINT not null;
create index if not exists PUBLIC."durusmalar_durusmalar_id_index"
	on PUBLIC."durusmalar" ("durusmalar_id");

create index if not exists PUBLIC."dosya_ayrintilar_dosya_ayrintilar_id_index"
	on PUBLIC."dosya_ayrintilar" ("dosya_ayrintilar_id");

alter table PUBLIC."evraklar"
    drop column if exists "filePath";

create table if not exists PUBLIC."borclu_sorgulari"
(
    "borclu_sorgulari_id" INTEGER auto_increment,
    "dosyaId"             VARCHAR_IGNORECASE(1000000000)                     not null,
    "kisiKurumId"         BIGINT                                        not null,
    "created_tarihi"      TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "sorgu_tarihi"        TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP not null,
    "sorgu_turu"          VARCHAR_IGNORECASE(1000000000)                     not null,
    "sorgu_sonucu"        JSON,
    constraint "borclu_sorgulari_pk"
        primary key ("dosyaId", "kisiKurumId", "sorgu_turu", "sorgu_tarihi"),
    constraint "borclu_sorgulari_dosyalar_hash_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar"
            on update cascade on delete cascade
);

create index if not exists PUBLIC.borclu_sorgulari_sorgu_sonucu_index
    on PUBLIC."borclu_sorgulari" ("sorgu_sonucu");
    

drop table if exists PUBLIC."harcTahsilatAyrinti";
create table PUBLIC."harcTahsilatAyrinti"
(
    "dosyaId"                CHARACTER VARYING(1000000000) not null,
    "created_tarihi"         TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "harcTahsilatAyrinti_id" INTEGER auto_increment,
    "harc_tahsilat_reddiyat" SMALLINT             default 0 not null,
    "birimAdi"               VARCHAR_IGNORECASE(1000000000),
    "dosyaNo"                VARCHAR_IGNORECASE(1000000000),
    "dosyaTurAciklama"       VARCHAR_IGNORECASE(1000000000),
    "kayitId"                BIGINT,
    "makbuzNo"               BIGINT,
    "odeyenKisi"             VARCHAR_IGNORECASE(1000000000),
    "tahsilatTarihi"         TIMESTAMP WITH TIME ZONE,
    "tahsilatTuru"           VARCHAR_IGNORECASE(1000000000),
    "gelirVergisi"           NUMERIC(20, 4),
    "miktar"                 NUMERIC(20, 4),
    "odenecekMiktar"         NUMERIC(20, 4),
    "reddiyatNedeni"         VARCHAR_IGNORECASE(1000000000),
    "reddiyatTarihi"         TIMESTAMP WITH TIME ZONE,
    "tahsilatTutari"         NUMERIC(20, 4),
    "kalanMiktar"            NUMERIC(20, 4),
    "tahsilHarci"            NUMERIC(20, 4),
    "key_part"               VARCHAR_IGNORECASE(1000000000)     not null,
    constraint "harcTahsilatAyrinti_pk"
        primary key ("dosyaId", "harc_tahsilat_reddiyat", "key_part"),
    constraint "harcTahsilatAyrinti_dosyalar_hash_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar"
            on update cascade on delete cascade
);

create index if not exists PUBLIC."harcTahsilatAyrinti_birimAdi_index"
    on PUBLIC."harcTahsilatAyrinti" ("birimAdi");

create index if not exists PUBLIC."harcTahsilatAyrinti_created_tarihi_index"
    on PUBLIC."harcTahsilatAyrinti" ("created_tarihi");

create index if not exists PUBLIC."harcTahsilatAyrinti_dosyaNo_index"
    on PUBLIC."harcTahsilatAyrinti" ("dosyaNo");

create index if not exists PUBLIC."harcTahsilatAyrinti_dosyaTurAciklama_index"
    on PUBLIC."harcTahsilatAyrinti" ("dosyaTurAciklama");

create index if not exists PUBLIC."harcTahsilatAyrinti_harc_tahsilat_ayrinti_id_index"
    on PUBLIC."harcTahsilatAyrinti" ("harcTahsilatAyrinti_id");

create index if not exists PUBLIC."harcTahsilatAyrinti_makbuzNo_index"
    on PUBLIC."harcTahsilatAyrinti" ("makbuzNo");

create index if not exists PUBLIC."harcTahsilatAyrinti_miktar_index"
    on PUBLIC."harcTahsilatAyrinti" ("miktar");

create index if not exists PUBLIC."harcTahsilatAyrinti_odeyenKisi_index"
    on PUBLIC."harcTahsilatAyrinti" ("odeyenKisi");

create index if not exists PUBLIC."harcTahsilatAyrinti_reddiyatNedeni_index"
    on PUBLIC."harcTahsilatAyrinti" ("reddiyatNedeni");

create index if not exists PUBLIC."harcTahsilatAyrinti_reddiyatTarihi_index"
    on PUBLIC."harcTahsilatAyrinti" ("reddiyatTarihi");

create index if not exists PUBLIC."harcTahsilatAyrinti_tahsilatTarihi_index"
    on PUBLIC."harcTahsilatAyrinti" ("tahsilatTarihi");

create index if not exists PUBLIC."harcTahsilatAyrinti_tahsilatTuru_index"
    on PUBLIC."harcTahsilatAyrinti" ("tahsilatTuru");

drop table if exists PUBLIC."harcTahsilatToplam";
create table PUBLIC."harcTahsilatToplam"
(
    "haricen"               NUMERIC(20, 4)           default 0,
    "dosyaId"               CHARACTER VARYING(1000000000) not null,
    "toplamTahsilHarci"     NUMERIC(20, 4)           default 0,
    "toplamreddiyat"        NUMERIC(20, 4)           default 0,
    "toplamTahsilat"        NUMERIC(20, 4)           default 0,
    "toplamKalan"           NUMERIC(20, 4)           default 0,
    "toplamTeminat"         NUMERIC(20, 4)           default 0,
    "created_tarihi"        TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "harcTahsilatToplam_id" INTEGER auto_increment,
    "isIcraMi"              BOOLEAN,
    constraint "harcTahsilatToplam_pk"
        primary key ("dosyaId"),
    constraint "harcTahsilatToplam_dosyalar_hash_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar"
            on update cascade on delete cascade
);

create index if not exists PUBLIC."harcTahsilatToplam_created_tarihi_index"
    on PUBLIC."harcTahsilatToplam" ("created_tarihi");

create index if not exists PUBLIC."harcTahsilatToplam_harc_tahsilat_toplam_id_index"
    on PUBLIC."harcTahsilatToplam" ("harcTahsilatToplam_id");

create index if not exists PUBLIC."harcTahsilatToplam_haricen_index"
    on PUBLIC."harcTahsilatToplam" ("haricen");

create index if not exists PUBLIC."harcTahsilatToplam_isIcraMi_index"
    on PUBLIC."harcTahsilatToplam" ("isIcraMi");

create index if not exists PUBLIC."harcTahsilatToplam_toplamKalan_index"
    on PUBLIC."harcTahsilatToplam" ("toplamKalan");

create index if not exists PUBLIC."harcTahsilatToplam_toplamTahsilHarci_index"
    on PUBLIC."harcTahsilatToplam" ("toplamTahsilHarci");

create index if not exists PUBLIC."harcTahsilatToplam_toplamTahsilat_index"
    on PUBLIC."harcTahsilatToplam" ("toplamTahsilat");

create index if not exists PUBLIC."harcTahsilatToplam_toplamTeminat_index"
    on PUBLIC."harcTahsilatToplam" ("toplamTeminat");

create index if not exists PUBLIC."harcTahsilatToplam_toplamreddiyat_index"
    on PUBLIC."harcTahsilatToplam" ("toplamreddiyat");


alter table PUBLIC."messages" alter column if exists "okundu_tarihi" TIMESTAMP WITH TIME ZONE;

drop table if exists PUBLIC."harici_tebligatlar";
create table PUBLIC."harici_tebligatlar"
(
    "barkodNo"              NUMERIC(100000)          default 0 not null,
    "durum"                 VARCHAR_IGNORECASE(200),
    "eTebligat"             BOOLEAN                  default FALSE,
    "evrakTarihi"           TIMESTAMP WITH TIME ZONE,
    "icerik"                VARCHAR_IGNORECASE(1000000000),
    "isLastState"           TINYINT,
    "gorulmemis"            BOOLEAN                  default TRUE,
    "lastStateTarihi"       TIMESTAMP WITH TIME ZONE,
    "muhatap"               VARCHAR_IGNORECASE(1000000000),
    "created_tarihi"        TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "harici_tebligatlar_id" INTEGER auto_increment,
    constraint "harici_tebligatlar_pk"
        primary key ("barkodNo")
);

create index if not exists PUBLIC."harici_tebligatlar_created_tarihi_index"
    on PUBLIC."harici_tebligatlar" ("created_tarihi");

create index if not exists PUBLIC."harici_tebligatlar_durum_index"
    on PUBLIC."harici_tebligatlar" ("durum");

create index if not exists PUBLIC."harici_tebligatlar_eTebligat_index"
    on PUBLIC."harici_tebligatlar" ("eTebligat");

create index if not exists PUBLIC."harici_tebligatlar_evrakTarihi_index"
    on PUBLIC."harici_tebligatlar" ("evrakTarihi");

create index if not exists PUBLIC."harici_tebligatlar_gorulmemis_index"
    on PUBLIC."harici_tebligatlar" ("gorulmemis");

create index if not exists PUBLIC."harici_tebligatlar_harici_tebligatlar_id_index"
    on PUBLIC."harici_tebligatlar" ("harici_tebligatlar_id");

create index if not exists PUBLIC."harici_tebligatlar_icerik_index"
    on PUBLIC."harici_tebligatlar" ("icerik");

create index if not exists PUBLIC."harici_tebligatlar_isLastState_index"
    on PUBLIC."harici_tebligatlar" ("isLastState");

create index if not exists PUBLIC."harici_tebligatlar_lastStateTarihi_index"
    on PUBLIC."harici_tebligatlar" ("lastStateTarihi");

create index if not exists PUBLIC."harici_tebligatlar_muhatap_index"
    on PUBLIC."harici_tebligatlar" ("muhatap");




alter table PUBLIC."taraflar" alter column if exists "vekil" JSON;
alter table PUBLIC."taraflar" alter column if exists "vekil" set null;
alter table PUBLIC."taraflar" alter column if exists "adres" JSON;
alter table PUBLIC."taraflar" alter column if exists "adres" set null;

create index if not exists PUBLIC."taraflar_vekil_index"
	on PUBLIC."taraflar" ("vekil");

alter table PUBLIC."taraflar"
	add if not exists "mail" VARCHAR_IGNORECASE(1000000000);
alter table PUBLIC."taraflar" drop constraint if exists "taraflar_mail_IDX";
create index if not exists PUBLIC."taraflar_adres_index"
	on PUBLIC."taraflar" ("adres");

alter table PUBLIC."tebligatlar" alter column if exists "dosyaId" CHARACTER VARYING(1000000000) not null;

alter table PUBLIC."yedekler"
    drop primary key;
alter table PUBLIC."yedekler"
	add constraint if not exists YEDEKLER_PK
		primary key ("yedekler_id");
        
TRUNCATE TABLE PUBLIC."versioning";
INSERT INTO PUBLIC."versioning" ("version") VALUES ( 9.0 );
