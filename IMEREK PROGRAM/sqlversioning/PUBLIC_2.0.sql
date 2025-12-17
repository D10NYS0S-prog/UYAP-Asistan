drop table if exists PUBLIC."borclu_bilgileri";
drop table if exists PUBLIC."dosya_ayrintilar";
drop table if exists PUBLIC."durusmalar";
drop table if exists PUBLIC."harcTahsilatAyrinti";
drop table if exists PUBLIC."harcTahsilatToplam";
drop table if exists PUBLIC."harici_evraklar";
drop table if exists PUBLIC."harici_tebligatlar";
drop table if exists PUBLIC."ihaleler";
drop table if exists PUBLIC."messages";
drop table if exists PUBLIC."muhasebe";
drop table if exists PUBLIC."notlar";
drop table if exists PUBLIC."takvim_olaylar";
drop table if exists PUBLIC."taraflar";
drop table if exists PUBLIC."tebligatlar";
drop table if exists PUBLIC."evraklar";
drop table if exists PUBLIC."dosyalar";


create table if not exists PUBLIC."calisma_grubu"
(
    "username"         CHARACTER VARYING(50) not null,
    "adi"              VARCHAR_IGNORECASE(50),
    "soyadi"           VARCHAR_IGNORECASE(50),
    "avukat_id"        BIGINT,
    "calisma_grubu_id" INTEGER auto_increment,
    constraint "calisma_grubu_pk2"
        primary key ("username")
);

create index if not exists PUBLIC."calisma_grubu_adi_index"
    on PUBLIC."calisma_grubu" ("adi");

create index if not exists PUBLIC."calisma_grubu_avukat_id_index"
    on PUBLIC."calisma_grubu" ("avukat_id");

create index if not exists PUBLIC."calisma_grubu_soyadi_index"
    on PUBLIC."calisma_grubu" ("soyadi");

create table if not exists PUBLIC."dosyalar"
(
    "dosyaNo"                                    VARCHAR_IGNORECASE(1000000000),
    "dosyaAcilisTarihi"                          TIMESTAMP WITH TIME ZONE,
    "birimId"                                    BIGINT                                not null,
    "birimAdi"                                   VARCHAR_IGNORECASE(1000000000),
    "birimTuru1"                                 VARCHAR_IGNORECASE(1000000000),
    "birimTuru2"                                 VARCHAR_IGNORECASE(1000000000),
    "birimTuru3"                                 VARCHAR_IGNORECASE(1000000000),
    "dosyaId"                                    CHARACTER VARYING(1000000000)         not null,
    "isNew"                                      BOOLEAN,
    "isDavaDosyasiAcilmisMi"                     BOOLEAN,
    "dosyaTurKod"                                SMALLINT,
    "dosyaDurum"                                 VARCHAR_IGNORECASE(1000000000),
    "dosyaTur"                                   VARCHAR_IGNORECASE(1000000000),
    "table_name"                                 VARCHAR_IGNORECASE(50),
    "created_tarihi"                             TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "gorulmemis"                                 BOOLEAN                  default TRUE,
    "dosyalar_id"                                INTEGER auto_increment,
    "is_aktif"                                   BOOLEAN                  default TRUE not null,
    "label"                                      VARCHAR_IGNORECASE(1000000000),
    "dosyaDurumKod"                              INTEGER,
    "dosyaTuru"                                  SMALLINT,
    "durumAdi"                                   VARCHAR_IGNORECASE(1000000000),
    "esasNo"                                     VARCHAR_IGNORECASE(1000000000),
    "gelisTarihi"                                TIMESTAMP WITH TIME ZONE,
    "ilislikiDosyaListesi"                       VARCHAR_IGNORECASE(1000000000),
    "mahkemeBirimAdi"                            VARCHAR_IGNORECASE(1000000000),
    "mahkemeEsasNo"                              VARCHAR_IGNORECASE(1000000000),
    "mahkemeKararNo"                             VARCHAR_IGNORECASE(1000000000),
    "mahkemeKararTarihi"                         TIMESTAMP WITH TIME ZONE,
    "savcilikOncelikDilekceSonuc"                VARCHAR_IGNORECASE(1000000000),
    "savcilikTarihi"                             TIMESTAMP WITH TIME ZONE,
    "teblignameNo"                               VARCHAR_IGNORECASE(1000000000),
    "kararTarihi"                                TIMESTAMP WITH TIME ZONE,
    "kapatmaTarihi"                              TIMESTAMP WITH TIME ZONE,
    "davaSucTuruAdi"                             VARCHAR_IGNORECASE(1000000000),
    "dosyaId_tam"                                CHARACTER VARYING(1000000000),
    "eskiAd"                                     VARCHAR_IGNORECASE(1000000000),
    "eskiOrgKod"                                 VARCHAR_IGNORECASE(1000000000),
    "evraginBirimDVODaGonderilecegiBirimBilgisi" BIGINT,
    "isTumunuKopyala"                            BOOLEAN,
    "orgKoduDegisti"                             BOOLEAN,
    "taranmamisKaydetme"                         VARCHAR_IGNORECASE(1000000000),
    "testMi"                                     SMALLINT,
    "yeniBirimEkle"                              BOOLEAN,
    "dosyaTurAciklama"                           VARCHAR_IGNORECASE(1000000000),
    "genelDosyaDurumu"                           VARCHAR_IGNORECASE(1000000000),
    "danistayDairesi"                            BIGINT,
    "hash"                                       CHARACTER VARYING(500) generated always as CONCAT_WS('|', "dosyaNo",
                                                                                                      "birimId",
                                                                                                      "dosyaTurKod",
                                                                                                      "dosyaTuru",
                                                                                                      "esasNo",
                                                                                                      "dosyaTurAciklama",
                                                                                                      "danistayDairesi") NOT NULL ,
    constraint "dosyalar_pk"
        primary key ("hash"),
    constraint "dosyalar_pk2"
        unique ("dosyaId"),
    constraint "dosyalar_pk3"
        unique ("dosyaId_tam")
);

comment on column PUBLIC."dosyalar"."isNew" is 'cbs';

comment on column PUBLIC."dosyalar"."dosyaTurKod" is 'dosyalar,danıştay';

create table if not exists PUBLIC."borclu_bilgileri"
(
    "type"                     CHARACTER VARYING(1000000000) default ''   not null,
    "alt_kalem"                JSON              default '{}' not null,
    "gorulmemis"               BOOLEAN                       default TRUE not null,
    "dosyaId"                  CHARACTER VARYING(1000000000)              not null,
    "kisiKurumId"              BIGINT                                     not null,
    "adi"                      VARCHAR_IGNORECASE(1000000000),
    "aktifMernisAdresiSorgusu" BOOLEAN,
    "anaAdi"                   VARCHAR_IGNORECASE(1000000000),
    "babaAdi"                  VARCHAR_IGNORECASE(1000000000),
    "dogumTarihiStr"           TIMESTAMP WITH TIME ZONE,
    "hasOlumKaydi"             BOOLEAN,
    "isAvukat"                 BOOLEAN,
    "isHakimSavci"             BOOLEAN,
    "isNoter"                  BOOLEAN,
    "isTarafUyari"             BOOLEAN,
    "mernisDegisiklikNedeni"   VARCHAR_IGNORECASE(1000000000),
    "mernisDegisiklikVarmi"    BOOLEAN,
    "olumKaydi"                BOOLEAN,
    "sorguTuru"                SMALLINT,
    "soyadi"                   VARCHAR_IGNORECASE(1000000000),
    "tcKimlikNo"               BIGINT,
    "turu"                     SMALLINT,
    "is_takip_kesin"           BOOLEAN                       default FALSE,
    "islemSonucu"              VARCHAR_IGNORECASE(1000000000),
    "dosyaId_tam"              VARCHAR_IGNORECASE(1000000000),
    constraint "borclu_bilgileri_pk"
        primary key ("dosyaId", "kisiKurumId", "type"),
    constraint "borclu_bilgileri_dosyalar_dosyaId_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar" ("dosyaId")
            on update cascade on delete cascade,
    constraint "borclu_bilgileri_dosyalar_dosyaId_tam_fk"
        foreign key ("dosyaId_tam") references PUBLIC."dosyalar" ("dosyaId_tam")
            on update cascade on delete cascade
);

create index if not exists PUBLIC."borclu_bilgileri_adi_index"
    on PUBLIC."borclu_bilgileri" ("adi");

create index if not exists PUBLIC."borclu_bilgileri_aktifMernisAdresiSorgusu_index"
    on PUBLIC."borclu_bilgileri" ("aktifMernisAdresiSorgusu");

create index if not exists PUBLIC."borclu_bilgileri_anaAdi_index"
    on PUBLIC."borclu_bilgileri" ("anaAdi");

create index if not exists PUBLIC."borclu_bilgileri_babaAdi_index"
    on PUBLIC."borclu_bilgileri" ("babaAdi");

create index if not exists PUBLIC."borclu_bilgileri_dogumTarihiStr_index"
    on PUBLIC."borclu_bilgileri" ("dogumTarihiStr");

create index if not exists PUBLIC."borclu_bilgileri_dosyaId_tam_index"
    on PUBLIC."borclu_bilgileri" ("dosyaId_tam");

create index if not exists PUBLIC."borclu_bilgileri_gorulmemis_index"
    on PUBLIC."borclu_bilgileri" ("gorulmemis");

create index if not exists PUBLIC."borclu_bilgileri_hasOlumKaydi_index"
    on PUBLIC."borclu_bilgileri" ("hasOlumKaydi");

create index if not exists PUBLIC."borclu_bilgileri_is_takip_kesin_index"
    on PUBLIC."borclu_bilgileri" ("is_takip_kesin");

create index if not exists PUBLIC."borclu_bilgileri_islemSonucu_index"
    on PUBLIC."borclu_bilgileri" ("islemSonucu");

create index if not exists PUBLIC."borclu_bilgileri_olumKaydi_index"
    on PUBLIC."borclu_bilgileri" ("olumKaydi");

create index if not exists PUBLIC."borclu_bilgileri_sorguTuru_index"
    on PUBLIC."borclu_bilgileri" ("sorguTuru");

create index if not exists PUBLIC."borclu_bilgileri_soyadi_index"
    on PUBLIC."borclu_bilgileri" ("soyadi");

create index if not exists PUBLIC."borclu_bilgileri_tcKimlikNo_index"
    on PUBLIC."borclu_bilgileri" ("tcKimlikNo");

create index if not exists PUBLIC."borclu_bilgileri_turu_index"
    on PUBLIC."borclu_bilgileri" ("turu");

create table if not exists PUBLIC."dosya_ayrintilar"
(
    "dosyaId"             CHARACTER VARYING(1000000000)                      not null,
    "key"                 VARCHAR_IGNORECASE(1000000000)                     not null,
    "val"                 VARCHAR_IGNORECASE(1000000000)                     not null,
    "created_tarihi"      TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP not null,
    "dosya_ayrintilar_id" INTEGER auto_increment,
    "is_aktif"            BOOLEAN                  default TRUE,
    "dosyaId_tam"         CHARACTER VARYING(1000000000),
    constraint "dosya_ayrintilar_pk"
        primary key ("key", "val", "dosyaId"),
    constraint "dosya_ayrintilar_dosyalar_dosyaId_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar" ("dosyaId")
            on update cascade on delete cascade,
    constraint "dosya_ayrintilar_dosyalar_dosyaId_tam_fk"
        foreign key ("dosyaId_tam") references PUBLIC."dosyalar" ("dosyaId_tam")
            on update cascade on delete cascade
);

create index if not exists PUBLIC."dosya_ayrintilar_dosyaId_tam_index"
    on PUBLIC."dosya_ayrintilar" ("dosyaId_tam");

create index if not exists PUBLIC."dosya_ayrintilar_is_aktif_index"
    on PUBLIC."dosya_ayrintilar" ("is_aktif");

create index if not exists PUBLIC."dosyalar_birimAdi_index"
    on PUBLIC."dosyalar" ("birimAdi");

create index if not exists PUBLIC."dosyalar_birimId_index"
    on PUBLIC."dosyalar" ("birimId");

create index if not exists PUBLIC."dosyalar_birimTuru1_index"
    on PUBLIC."dosyalar" ("birimTuru1");

create index if not exists PUBLIC."dosyalar_birimTuru2_index"
    on PUBLIC."dosyalar" ("birimTuru2");

create index if not exists PUBLIC."dosyalar_birimTuru3_index"
    on PUBLIC."dosyalar" ("birimTuru3");

create index if not exists PUBLIC."dosyalar_created_tarihi_index"
    on PUBLIC."dosyalar" ("created_tarihi");

create index if not exists PUBLIC."dosyalar_danistayDairesi_index"
    on PUBLIC."dosyalar" ("danistayDairesi");

create index if not exists PUBLIC."dosyalar_davaSucTuruAdi_index"
    on PUBLIC."dosyalar" ("davaSucTuruAdi");

create index if not exists PUBLIC."dosyalar_dosyaAcilisTarihi_index"
    on PUBLIC."dosyalar" ("dosyaAcilisTarihi");

create index if not exists PUBLIC."dosyalar_dosyaDurumKod_index"
    on PUBLIC."dosyalar" ("dosyaDurumKod");

create index if not exists PUBLIC."dosyalar_dosyaId_tam_index"
    on PUBLIC."dosyalar" ("dosyaId_tam");

create index if not exists PUBLIC."dosyalar_dosyaNo_index"
    on PUBLIC."dosyalar" ("dosyaNo");

create index if not exists PUBLIC."dosyalar_dosyaTurAciklama_index"
    on PUBLIC."dosyalar" ("dosyaTurAciklama");

create index if not exists PUBLIC."dosyalar_dosyaTurKod_index"
    on PUBLIC."dosyalar" ("dosyaTurKod");

create index if not exists PUBLIC."dosyalar_dosyaTur_index"
    on PUBLIC."dosyalar" ("dosyaTur");

create index if not exists PUBLIC."dosyalar_dosyaTuru_index"
    on PUBLIC."dosyalar" ("dosyaTuru");

create index if not exists PUBLIC."dosyalar_dosyalar_id_index"
    on PUBLIC."dosyalar" ("dosyalar_id");

create index if not exists PUBLIC."dosyalar_durumAdi_index"
    on PUBLIC."dosyalar" ("dosyaDurum");

create index if not exists PUBLIC."dosyalar_durumAdi_index2"
    on PUBLIC."dosyalar" ("durumAdi");

create index if not exists PUBLIC."dosyalar_esasNo_index"
    on PUBLIC."dosyalar" ("esasNo");

create index if not exists PUBLIC."dosyalar_gelisTarihi_index"
    on PUBLIC."dosyalar" ("gelisTarihi");

create index if not exists PUBLIC."dosyalar_genelDosyaDurumu_index"
    on PUBLIC."dosyalar" ("genelDosyaDurumu");

create index if not exists PUBLIC."dosyalar_gorulmemis_index"
    on PUBLIC."dosyalar" ("gorulmemis");

create index if not exists PUBLIC."dosyalar_isDavaDosyasiAcilmisMi_index"
    on PUBLIC."dosyalar" ("isDavaDosyasiAcilmisMi");

create index if not exists PUBLIC."dosyalar_isNew_index"
    on PUBLIC."dosyalar" ("isNew");

create index if not exists PUBLIC."dosyalar_is_aktif_index"
    on PUBLIC."dosyalar" ("is_aktif");

create index if not exists PUBLIC."dosyalar_kapatmaTarihi_index"
    on PUBLIC."dosyalar" ("kapatmaTarihi");

create index if not exists PUBLIC."dosyalar_kararTarihi_index"
    on PUBLIC."dosyalar" ("kararTarihi");

create index if not exists PUBLIC."dosyalar_label_index"
    on PUBLIC."dosyalar" ("label");

create index if not exists PUBLIC."dosyalar_mahkemeBirimAdi_index"
    on PUBLIC."dosyalar" ("mahkemeBirimAdi");

create index if not exists PUBLIC."dosyalar_mahkemeEsasNo_index"
    on PUBLIC."dosyalar" ("mahkemeEsasNo");

create index if not exists PUBLIC."dosyalar_table_name_index"
    on PUBLIC."dosyalar" ("table_name");

create table if not exists PUBLIC."durusmalar"
(
    "birimTuru3"                VARCHAR_IGNORECASE(15),
    "birimId"                   BIGINT                              not null,
    "birimOrgKodu"              VARCHAR_IGNORECASE(1000000000),
    "birimTuru1"                VARCHAR_IGNORECASE(15),
    "birimTuru2"                VARCHAR_IGNORECASE(15),
    "dosyaId"                   CHARACTER VARYING(1000000000)       not null,
    "dosyaNo"                   VARCHAR_IGNORECASE(1000000000),
    "dosyaTurKod"               SMALLINT,
    "dosyaTurKodAciklama"       VARCHAR_IGNORECASE(1000000000),
    "hakimHeyet"                SMALLINT,
    "isEDurusmaBirimTalepValid" BOOLEAN,
    "isEDurusmaGuncellenecek"   BOOLEAN,
    "isEDurusmaSaatTalepValid"  BOOLEAN,
    "islemSonucu"               SMALLINT,
    "islemSonucuAciklama"       VARCHAR_IGNORECASE(1000000000),
    "islemTuru"                 SMALLINT,
    "islemTuruAciklama"         VARCHAR_IGNORECASE(1000000000),
    "izinliHakimList"           JSON,
    "katilButonAktifMi"         BOOLEAN,
    "kayitId"                   BIGINT                   default -1 not null,
    "talepDurumu"               VARCHAR_IGNORECASE(1000000000),
    "tarihSaat"                 TIMESTAMP WITH TIME ZONE,
    "yerelBirimAd"              VARCHAR_IGNORECASE(1000000000),
    "created_tarihi"            TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "durusmalar_id"             INTEGER auto_increment,
    "token"                     CHARACTER VARYING(1000000000),
    "dosyaId_tam"               VARCHAR_IGNORECASE(1000000000),
    constraint "durusmalar_pk2"
        primary key ("kayitId", "birimId")
);

create index if not exists  PUBLIC."durusmalar_birimTuru1_index"
    on PUBLIC."durusmalar" ("birimTuru1");

create index if not exists  PUBLIC."durusmalar_birimTuru2_index"
    on PUBLIC."durusmalar" ("birimTuru2");

create index if not exists  PUBLIC."durusmalar_birimTuru3_index"
    on PUBLIC."durusmalar" ("birimTuru3");

create index if not exists  PUBLIC."durusmalar_dosyaId_index"
    on PUBLIC."durusmalar" ("dosyaId");

create index if not exists  PUBLIC."durusmalar_dosyaId_tam_index"
    on PUBLIC."durusmalar" ("dosyaId_tam");

create index if not exists  PUBLIC."durusmalar_dosyaNo_index"
    on PUBLIC."durusmalar" ("dosyaNo");

create index if not exists  PUBLIC."durusmalar_dosyaTurKodAciklama_index"
    on PUBLIC."durusmalar" ("dosyaTurKodAciklama");

create index if not exists  PUBLIC."durusmalar_dosyaTurKod_index"
    on PUBLIC."durusmalar" ("dosyaTurKod");

create index if not exists  PUBLIC."durusmalar_islemSonucuAciklama_index"
    on PUBLIC."durusmalar" ("islemSonucuAciklama");

create index if not exists  PUBLIC."durusmalar_islemSonucu_index"
    on PUBLIC."durusmalar" ("islemSonucu");

create index if not exists  PUBLIC."durusmalar_islemTuruAciklama_index"
    on PUBLIC."durusmalar" ("islemTuruAciklama");

create index if not exists  PUBLIC."durusmalar_islemTuru_index"
    on PUBLIC."durusmalar" ("islemTuru");

create index if not exists  PUBLIC."durusmalar_tarihSaat_index"
    on PUBLIC."durusmalar" ("tarihSaat");

create index if not exists  PUBLIC."durusmalar_yerelBirimAd_index"
    on PUBLIC."durusmalar" ("yerelBirimAd");

create table if not exists  PUBLIC."evraklar"
(
    "aciklama"                 VARCHAR_IGNORECASE(1000000000),
    "birimEvrakNo"             INTEGER                  default 0    not null,
    "dosyaId"                  CHARACTER VARYING(1000000000)         not null,
    "downloadId"               SMALLINT                 default 0    not null,
    "evrakId"                  BIGINT                                not null,
    "gonderenDosyaNo"          VARCHAR_IGNORECASE(1000000000),
    "gonderenSayi"             VARCHAR_IGNORECASE(1000000000),
    "gonderenYerKisi"          VARCHAR_IGNORECASE(1000000000),
    "onaylandigiTarih"         TIMESTAMP WITH TIME ZONE,
    "sistemeGonderildigiTarih" TIMESTAMP WITH TIME ZONE,
    "tip"                      VARCHAR_IGNORECASE(1000000000),
    "tur"                      VARCHAR_IGNORECASE(1000000000),
    "anaEvrakId"               BIGINT,
    "created_tarihi"           TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "gorulmemis"               BOOLEAN                  default TRUE,
    "evraklar_id"              INTEGER auto_increment,
    "filePath"                 VARCHAR_IGNORECASE(1000000000),
    "label"                    VARCHAR_IGNORECASE(1000000000),
    "is_aktif"                 BOOLEAN                  default TRUE not null,
    "dosyaId_tam"              CHARACTER VARYING(1000000000),
    "ggEvrakId"                BIGINT,
    "isYetkili"                BOOLEAN,
    "ana_dosyaId"              CHARACTER VARYING(20)                 not null,
    "ana_dosyaId_tam"          CHARACTER VARYING(1000000000),
    "sira"                     BIGINT,
    "alt_dosyaNo"              VARCHAR_IGNORECASE(100),
    "alt_dosyaTur"             VARCHAR_IGNORECASE(1000000000),
    "hash"                     CHARACTER VARYING(500) generated always as CONCAT_WS('|', "dosyaId", "evrakId", "birimEvrakNo", "ana_dosyaId") not null ,
    constraint "evraklar_pk"
        primary key ("hash"),
    constraint "evraklar_dosyalar_dosyaId_fk"
        foreign key ("ana_dosyaId") references PUBLIC."dosyalar" ("dosyaId")
            on update cascade on delete cascade,
    constraint "evraklar_dosyalar_dosyaId_tam_fk"
        foreign key ("ana_dosyaId_tam") references PUBLIC."dosyalar" ("dosyaId_tam")
            on update cascade on delete cascade
);

create index if not exists  PUBLIC."evraklar_aciklama_index"
    on PUBLIC."evraklar" ("aciklama");

create index if not exists  PUBLIC."evraklar_alt_dosyaNo_index"
    on PUBLIC."evraklar" ("alt_dosyaNo");

create index if not exists  PUBLIC."evraklar_alt_dosyaTur_index"
    on PUBLIC."evraklar" ("alt_dosyaTur");

create index if not exists  PUBLIC."evraklar_anaEvrakId_index"
    on PUBLIC."evraklar" ("anaEvrakId");

create index if not exists  PUBLIC."evraklar_ana_dosyaId_index"
    on PUBLIC."evraklar" ("ana_dosyaId");

create index if not exists  PUBLIC."evraklar_ana_dosyaId_tam_index"
    on PUBLIC."evraklar" ("ana_dosyaId_tam");

create index if not exists  PUBLIC."evraklar_created_tarihi_index"
    on PUBLIC."evraklar" ("created_tarihi" desc);

create index if not exists  PUBLIC."evraklar_dosyaId_tam_index"
    on PUBLIC."evraklar" ("dosyaId_tam");

create index if not exists  PUBLIC."evraklar_downloadId_index"
    on PUBLIC."evraklar" ("downloadId");

create index if not exists  PUBLIC."evraklar_evraklar_id_index"
    on PUBLIC."evraklar" ("evraklar_id");

create index if not exists  PUBLIC."evraklar_filePath_index"
    on PUBLIC."evraklar" ("filePath");

create index if not exists  PUBLIC."evraklar_ggEvrakId_index"
    on PUBLIC."evraklar" ("ggEvrakId");

create index if not exists  PUBLIC."evraklar_gonderenDosyaNo_index"
    on PUBLIC."evraklar" ("gonderenDosyaNo");

create index if not exists  PUBLIC."evraklar_gonderenSayi_index"
    on PUBLIC."evraklar" ("gonderenSayi");

create index if not exists  PUBLIC."evraklar_gonderenYerKisi_index"
    on PUBLIC."evraklar" ("gonderenYerKisi");

create index if not exists  PUBLIC."evraklar_gorulmemis_index"
    on PUBLIC."evraklar" ("gorulmemis");

create index if not exists  PUBLIC."evraklar_isYetkili_index"
    on PUBLIC."evraklar" ("isYetkili");

create index if not exists  PUBLIC."evraklar_is_aktif_index"
    on PUBLIC."evraklar" ("is_aktif");

create index if not exists  PUBLIC."evraklar_label_index"
    on PUBLIC."evraklar" ("label");

create index if not exists  PUBLIC."evraklar_onayTarihi_index"
    on PUBLIC."evraklar" ("onaylandigiTarih" desc);

create index if not exists  PUBLIC."evraklar_sira_index"
    on PUBLIC."evraklar" ("sira");

create index if not exists  PUBLIC."evraklar_sistemTarihi_index"
    on PUBLIC."evraklar" ("sistemeGonderildigiTarih" desc);

create index if not exists  PUBLIC."evraklar_tipi_index"
    on PUBLIC."evraklar" ("tip");

create index if not exists  PUBLIC."evraklar_turu_index"
    on PUBLIC."evraklar" ("tur");

create table if not exists  PUBLIC."harcTahsilatAyrinti"
(
    "dosyaId"                  CHARACTER VARYING(1000000000)      not null,
    "created_tarihi"           TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "harc_tahsilat_ayrinti_id" INTEGER auto_increment,
    "dosyaId_tam"              CHARACTER VARYING(1000000000),
    "harc_tahsilat_reddiyat"   SMALLINT                 default 0 not null,
    "birimAdi"                 VARCHAR_IGNORECASE(1000000000),
    "dosyaNo"                  VARCHAR_IGNORECASE(1000000000),
    "dosyaTurAciklama"         VARCHAR_IGNORECASE(1000000000),
    "hesaplamaYapilanTutar"    NUMERIC(20, 4)           default 0,
    "kayitId"                  BIGINT                   default 0 not null,
    "makbuzNo"                 BIGINT,
    "odenebilirMiktar"         NUMERIC(20, 4)           default 0,
    "odeyenKisi"               VARCHAR_IGNORECASE(1000000000),
    "tahsilatTarihi"           TIMESTAMP WITH TIME ZONE,
    "tahsilatTuru"             VARCHAR_IGNORECASE(1000000000),
    "yatirilanMiktar"          NUMERIC(20, 4)           default 0,
    "damgaVergisi"             NUMERIC(20, 4)           default 0,
    "durumAciklama"            VARCHAR_IGNORECASE(1000000000),
    "gelirVergisi"             NUMERIC(20, 4)           default 0,
    "kapattigiTahsilatIDler"   BIGINT,
    "miktar"                   NUMERIC(20, 4)           default 0,
    "odenecekMiktar"           NUMERIC(20, 4)           default 0,
    "reddiyatNedeni"           VARCHAR_IGNORECASE(1000000000),
    "reddiyatTarihi"           TIMESTAMP WITH TIME ZONE,
    "isIcraMi"                 BOOLEAN,
    constraint "harcTahsilatAyrinti_pk"
        primary key ("dosyaId", "harc_tahsilat_reddiyat", "kayitId"),
    constraint "harcTahsilatAyrinti_dosyalar_dosyaId_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar" ("dosyaId")
            on update cascade on delete cascade,
    constraint "harcTahsilatAyrinti_dosyalar_dosyaId_tam_fk"
        foreign key ("dosyaId_tam") references PUBLIC."dosyalar" ("dosyaId_tam")
            on update cascade on delete cascade
);

create index if not exists  PUBLIC."harcTahsilatAyrinti_birimAdi_index"
    on PUBLIC."harcTahsilatAyrinti" ("birimAdi");

create index if not exists  PUBLIC."harcTahsilatAyrinti_created_tarihi_index"
    on PUBLIC."harcTahsilatAyrinti" ("created_tarihi");

create index if not exists  PUBLIC."harcTahsilatAyrinti_dosyaId_tam_index"
    on PUBLIC."harcTahsilatAyrinti" ("dosyaId_tam");

create index if not exists  PUBLIC."harcTahsilatAyrinti_dosyaNo_index"
    on PUBLIC."harcTahsilatAyrinti" ("dosyaNo");

create index if not exists  PUBLIC."harcTahsilatAyrinti_dosyaTurAciklama_index"
    on PUBLIC."harcTahsilatAyrinti" ("dosyaTurAciklama");

create index if not exists  PUBLIC."harcTahsilatAyrinti_durumAciklama_index"
    on PUBLIC."harcTahsilatAyrinti" ("durumAciklama");

create index if not exists  PUBLIC."harcTahsilatAyrinti_harc_tahsilat_ayrinti_id_index"
    on PUBLIC."harcTahsilatAyrinti" ("harc_tahsilat_ayrinti_id");

create index if not exists  PUBLIC."harcTahsilatAyrinti_hesaplamaYapilanTutar_index"
    on PUBLIC."harcTahsilatAyrinti" ("hesaplamaYapilanTutar");

create index if not exists  PUBLIC."harcTahsilatAyrinti_isIcraMi_index"
    on PUBLIC."harcTahsilatAyrinti" ("isIcraMi");

create index if not exists  PUBLIC."harcTahsilatAyrinti_makbuzNo_index"
    on PUBLIC."harcTahsilatAyrinti" ("makbuzNo");

create index if not exists  PUBLIC."harcTahsilatAyrinti_miktar_index"
    on PUBLIC."harcTahsilatAyrinti" ("miktar");

create index if not exists  PUBLIC."harcTahsilatAyrinti_odeyenKisi_index"
    on PUBLIC."harcTahsilatAyrinti" ("odeyenKisi");

create index if not exists  PUBLIC."harcTahsilatAyrinti_reddiyatNedeni_index"
    on PUBLIC."harcTahsilatAyrinti" ("reddiyatNedeni");

create index if not exists  PUBLIC."harcTahsilatAyrinti_reddiyatTarihi_index"
    on PUBLIC."harcTahsilatAyrinti" ("reddiyatTarihi");

create index if not exists  PUBLIC."harcTahsilatAyrinti_tahsilatTarihi_index"
    on PUBLIC."harcTahsilatAyrinti" ("tahsilatTarihi");

create index if not exists  PUBLIC."harcTahsilatAyrinti_tahsilatTuru_index"
    on PUBLIC."harcTahsilatAyrinti" ("tahsilatTuru");

create index if not exists  PUBLIC."harcTahsilatAyrinti_yatirilanMiktar_index"
    on PUBLIC."harcTahsilatAyrinti" ("yatirilanMiktar");

create table if not exists  PUBLIC."harcTahsilatToplam"
(
    "haricen"                 NUMERIC(20, 4)           default 0,
    "dosyaId"                 CHARACTER VARYING(1000000000) not null,
    "toplamTahsilHarci"       NUMERIC(20, 4)           default 0,
    "toplamreddiyat"          NUMERIC(20, 4)           default 0,
    "toplamTahsilat"          NUMERIC(20, 4)           default 0,
    "toplamKalan"             NUMERIC(20, 4)           default 0,
    "toplamTeminat"           NUMERIC(20, 4)           default 0,
    "created_tarihi"          TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "harc_tahsilat_toplam_id" INTEGER auto_increment,
    "dosyaId_tam"             CHARACTER VARYING(1000000000),
    "isIcraMi"                BOOLEAN,
    constraint "harcTahsilatToplam_pk"
        primary key ("dosyaId"),
    constraint "harcTahsilatToplam_dosyalar_dosyaId_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar" ("dosyaId")
            on update cascade on delete cascade,
    constraint "harcTahsilatToplam_dosyalar_dosyaId_tam_fk"
        foreign key ("dosyaId_tam") references PUBLIC."dosyalar" ("dosyaId_tam")
            on update cascade on delete cascade
);

create index if not exists  PUBLIC."harcTahsilatToplam_created_tarihi_index"
    on PUBLIC."harcTahsilatToplam" ("created_tarihi");

create index if not exists  PUBLIC."harcTahsilatToplam_dosyaId_tam_index"
    on PUBLIC."harcTahsilatToplam" ("dosyaId_tam");

create index if not exists  PUBLIC."harcTahsilatToplam_harc_tahsilat_toplam_id_index"
    on PUBLIC."harcTahsilatToplam" ("harc_tahsilat_toplam_id");

create index if not exists  PUBLIC."harcTahsilatToplam_haricen_index"
    on PUBLIC."harcTahsilatToplam" ("haricen");

create index if not exists  PUBLIC."harcTahsilatToplam_isIcraMi_index"
    on PUBLIC."harcTahsilatToplam" ("isIcraMi");

create index if not exists  PUBLIC."harcTahsilatToplam_toplamKalan_index"
    on PUBLIC."harcTahsilatToplam" ("toplamKalan");

create index if not exists  PUBLIC."harcTahsilatToplam_toplamTahsilHarci_index"
    on PUBLIC."harcTahsilatToplam" ("toplamTahsilHarci");

create index if not exists  PUBLIC."harcTahsilatToplam_toplamTahsilat_index"
    on PUBLIC."harcTahsilatToplam" ("toplamTahsilat");

create index if not exists  PUBLIC."harcTahsilatToplam_toplamTeminat_index"
    on PUBLIC."harcTahsilatToplam" ("toplamTeminat");

create index if not exists  PUBLIC."harcTahsilatToplam_toplamreddiyat_index"
    on PUBLIC."harcTahsilatToplam" ("toplamreddiyat");

create table if not exists  PUBLIC."harici_evraklar"
(
    "filePath"           VARCHAR_IGNORECASE(1000000000),
    "dosyaId"            BIGINT,
    "hiddennumber"       INTEGER,
    "harici_evraklar_id" INTEGER auto_increment,
    "aciklama"           CHARACTER VARYING(1000000000),
    constraint "harici_evraklar_pk"
        primary key ("harici_evraklar_id")
);

create index if not exists  PUBLIC."harici_evraklar_aciklama_index"
    on PUBLIC."harici_evraklar" ("aciklama");

create index if not exists  PUBLIC."harici_evraklar_dosyaId_index"
    on PUBLIC."harici_evraklar" ("dosyaId");

create index if not exists  PUBLIC."harici_evraklar_filePath_index"
    on PUBLIC."harici_evraklar" ("filePath");

create index if not exists  PUBLIC."harici_evraklar_hiddennumber_index"
    on PUBLIC."harici_evraklar" ("hiddennumber");

create table if not exists  PUBLIC."harici_tebligatlar"
(
    "barkodNo"        NUMERIC                  default 0 not null,
    "durum"           VARCHAR_IGNORECASE(200),
    "eTebligat"       BOOLEAN                  default FALSE,
    "evrakTarihi"     TIMESTAMP WITH TIME ZONE,
    "icerik"          VARCHAR_IGNORECASE(1000000000),
    "isLastState"     TINYINT,
    "gorulmemis"      BOOLEAN                  default TRUE,
    "lastStateTarihi" TIMESTAMP WITH TIME ZONE,
    "muhatap"         VARCHAR_IGNORECASE(1000000000),
    "created_tarihi"  TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "tebligatlar_id"  INTEGER auto_increment,
    constraint "harici_tebligatlar_pk2"
        primary key ("barkodNo")
);

create index if not exists  PUBLIC."harici_tebligatlar_created_tarihi_index"
    on PUBLIC."harici_tebligatlar" ("created_tarihi");

create index if not exists  PUBLIC."harici_tebligatlar_durum_index"
    on PUBLIC."harici_tebligatlar" ("durum");

create index if not exists  PUBLIC."harici_tebligatlar_eTebligat_index"
    on PUBLIC."harici_tebligatlar" ("eTebligat");

create index if not exists  PUBLIC."harici_tebligatlar_evrakTarihi_index"
    on PUBLIC."harici_tebligatlar" ("evrakTarihi");

create index if not exists  PUBLIC."harici_tebligatlar_gorulmemis_index"
    on PUBLIC."harici_tebligatlar" ("gorulmemis");

create index if not exists  PUBLIC."harici_tebligatlar_icerik_index"
    on PUBLIC."harici_tebligatlar" ("icerik");

create index if not exists  PUBLIC."harici_tebligatlar_isLastState_index"
    on PUBLIC."harici_tebligatlar" ("isLastState");

create index if not exists  PUBLIC."harici_tebligatlar_lastStateTarihi_index"
    on PUBLIC."harici_tebligatlar" ("lastStateTarihi");

create index if not exists  PUBLIC."harici_tebligatlar_muhatap_index"
    on PUBLIC."harici_tebligatlar" ("muhatap");

create index if not exists  PUBLIC."harici_tebligatlar_tebligatlar_id_index"
    on PUBLIC."harici_tebligatlar" ("tebligatlar_id");

create table if not exists  PUBLIC."ihaleler"
(
    "tarihAraligi__1"  TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "tarihAraligi__2"  TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "ihaleKayitId"     BIGINT not null,
    "malTip"           VARCHAR_IGNORECASE(1000000000),
    "satisYeri"        VARCHAR_IGNORECASE(1000000000),
    "satisiYapanBirim" VARCHAR_IGNORECASE(1000000000),
    "dosyaNo"          VARCHAR_IGNORECASE(1000000000),
    "dosyaTuru"        VARCHAR_IGNORECASE(1000000000),
    "satisSirasi"      VARCHAR_IGNORECASE(1000000000),
    "satisDurumu"      VARCHAR_IGNORECASE(1000000000),
    "eIlanDurumu"      VARCHAR_IGNORECASE(1000000000),
    "created_tarihi"   TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "ihaleler_id"      INTEGER auto_increment,
    constraint "ihaleler_pk"
        primary key ("ihaleKayitId")
);

create index if not exists  PUBLIC."ihaleler_created_tarihi_index"
    on PUBLIC."ihaleler" ("created_tarihi");

create index if not exists  PUBLIC."ihaleler_dosyaNo_index"
    on PUBLIC."ihaleler" ("dosyaNo");

create index if not exists  PUBLIC."ihaleler_dosyaTuru_index"
    on PUBLIC."ihaleler" ("dosyaTuru");

create index if not exists  PUBLIC."ihaleler_eIlanDurumu_index"
    on PUBLIC."ihaleler" ("eIlanDurumu");

create index if not exists  PUBLIC."ihaleler_ihaleler_id_index"
    on PUBLIC."ihaleler" ("ihaleler_id");

create index if not exists  PUBLIC."ihaleler_satisDurumu_index"
    on PUBLIC."ihaleler" ("satisDurumu");

create index if not exists  PUBLIC."ihaleler_satisYeri_index"
    on PUBLIC."ihaleler" ("satisYeri");

create index if not exists  PUBLIC."ihaleler_satisiYapanBirim_index"
    on PUBLIC."ihaleler" ("satisiYapanBirim");

create index if not exists  PUBLIC."ihaleler_tarihAraligi__1_index"
    on PUBLIC."ihaleler" ("tarihAraligi__1");

create index if not exists  PUBLIC."ihaleler_tarihAraligi__2_index"
    on PUBLIC."ihaleler" ("tarihAraligi__2");

create table if not exists  PUBLIC."messages"
(
    "messages_id"     BIGINT auto_increment,
    "gonderen"        VARCHAR_IGNORECASE(50),
    "alan"            VARCHAR_IGNORECASE(50),
    "mesaj"           VARCHAR_IGNORECASE(1000000000),
    "okundu_flag"     BOOLEAN                  default FALSE,
    "aktif_flag_alan" BOOLEAN                  default TRUE,
    "type"            VARCHAR_IGNORECASE(1000000000),
    "type_id"         BIGINT,
    "created_tarihi"  TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "okundu_tarihi"   TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    constraint "messages_pk"
        primary key ("messages_id"),
    constraint "messages_calisma_grubu_username_fk"
        foreign key ("alan") references PUBLIC."calisma_grubu"
            on update cascade on delete cascade
);

create index if not exists  PUBLIC."messages_aktif_flag_alan_index"
    on PUBLIC."messages" ("aktif_flag_alan");

create index if not exists  PUBLIC."messages_created_tarihi_index"
    on PUBLIC."messages" ("created_tarihi");

create index if not exists  PUBLIC."messages_gonderen_index"
    on PUBLIC."messages" ("gonderen");

create index if not exists  PUBLIC."messages_okundu_flag_index"
    on PUBLIC."messages" ("okundu_flag");

create index if not exists  PUBLIC."messages_okundu_tarihi_index"
    on PUBLIC."messages" ("okundu_tarihi");

create index if not exists  PUBLIC."messages_type_id_index"
    on PUBLIC."messages" ("type_id");

create index if not exists  PUBLIC."messages_type_index"
    on PUBLIC."messages" ("type");

create table if not exists  PUBLIC."muhasebe"
(
    "dosyaId"          CHARACTER VARYING(1000000000)         not null,
    "tahsilatAciklama" VARCHAR_IGNORECASE(500),
    "tahsilatTarihi"   TIMESTAMP WITH TIME ZONE,
    "yatirilanMiktar"  NUMERIC(20, 4),
    "tip"              INTEGER               default 1       not null,
    "muhasebe_id"      INTEGER auto_increment,
    "creator"          CHARACTER VARYING(50) default 'ADMIN' not null,
    constraint "muhasebe_pk"
        primary key ("muhasebe_id"),
    constraint "muhasebe_dosyalar_dosyaId_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar" ("dosyaId")
            on update cascade on delete cascade
);

create index if not exists  PUBLIC."muhasebe_creator_index"
    on PUBLIC."muhasebe" ("creator");

create index if not exists  PUBLIC."muhasebe_dosyaId_index"
    on PUBLIC."muhasebe" ("dosyaId");

create index if not exists  PUBLIC."muhasebe_tahsilatAciklama_index"
    on PUBLIC."muhasebe" ("tahsilatAciklama");

create index if not exists  PUBLIC."muhasebe_tahsilatTarihi_index"
    on PUBLIC."muhasebe" ("tahsilatTarihi");

create index if not exists  PUBLIC."muhasebe_tip_index"
    on PUBLIC."muhasebe" ("tip");

create index if not exists  PUBLIC."muhasebe_yatirilanMiktar_index"
    on PUBLIC."muhasebe" ("yatirilanMiktar");

create table if not exists  PUBLIC."notlar"
(
    "type"            VARCHAR_IGNORECASE(1000000000)                     not null,
    "alinan_not"      VARCHAR_IGNORECASE(1000000000)                     not null,
    "kaynakId"        CHARACTER VARYING(1000000000)                      not null,
    "created_tarihi"  TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP not null,
    "creator"         CHARACTER VARYING(50)    default 'ADMIN'           not null,
    "notlar_id"       INTEGER auto_increment,
    "modified_tarihi" TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP not null,
    constraint "notlar_pk"
        primary key ("creator", "type", "kaynakId"),
    constraint "notlar_calisma_grubu_username_fk"
        foreign key ("creator") references PUBLIC."calisma_grubu"
            on update cascade on delete cascade
);

create index if not exists  PUBLIC."notlar_created_tarihi_index"
    on PUBLIC."notlar" ("created_tarihi");

create index if not exists  PUBLIC."notlar_modified_tarihi_index"
    on PUBLIC."notlar" ("modified_tarihi");

create index if not exists  PUBLIC."notlar_notlar_id_index"
    on PUBLIC."notlar" ("notlar_id");

create table if not exists  PUBLIC."takvim_olaylar"
(
    "type"              VARCHAR_IGNORECASE(20)        not null,
    "kaynakId"          CHARACTER VARYING(1000000000) not null,
    "created_tarihi"    TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "takvim_olaylar_id" INTEGER auto_increment,
    "google_event_id"   CHARACTER VARYING(1000000000) not null,
    "google_takvim"     CHARACTER VARYING(1000000000),
    constraint "takvim_olaylar_pk"
        primary key ("google_event_id")
);

create index if not exists  PUBLIC."takvim_olaylar_created_tarihi_index"
    on PUBLIC."takvim_olaylar" ("created_tarihi");

create index if not exists  PUBLIC."takvim_olaylar_google_takvim_index"
    on PUBLIC."takvim_olaylar" ("google_takvim");

create index if not exists  PUBLIC."takvim_olaylar_kaynakId_index"
    on PUBLIC."takvim_olaylar" ("kaynakId");

create index if not exists  PUBLIC."takvim_olaylar_takvim_olaylar_id_index"
    on PUBLIC."takvim_olaylar" ("takvim_olaylar_id");

create index if not exists  PUBLIC."takvim_olaylar_type_index"
    on PUBLIC."takvim_olaylar" ("type");

create table if not exists  PUBLIC."taraflar"
(
    "adi"            VARCHAR_IGNORECASE(1000000000) not null,
    "dosyaId"        CHARACTER VARYING(1000000000)  not null,
    "rol"            VARCHAR_IGNORECASE(1000000000) not null,
    "vekil"          JSON               not null,
    "created_tarihi" TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "taraflar_id"    INTEGER auto_increment,
    "tel_no"         VARCHAR_IGNORECASE(1000000000),
    "adres"          VARCHAR_IGNORECASE(1000000000) ARRAY,
    "dosyaId_tam"    CHARACTER VARYING(1000000000),
    constraint "taraflar_pk2"
        primary key ("dosyaId", "adi", "rol"),
    constraint "taraflar_dosyalar_dosyaId_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar" ("dosyaId")
            on update cascade on delete cascade,
    constraint "taraflar_dosyalar_dosyaId_tam_fk"
        foreign key ("dosyaId_tam") references PUBLIC."dosyalar" ("dosyaId_tam")
            on update cascade on delete cascade
);

create index if not exists  PUBLIC."taraflar_adres_index"
    on PUBLIC."taraflar" ("adres");

create index if not exists  PUBLIC."taraflar_dosyaId_tam_index"
    on PUBLIC."taraflar" ("dosyaId_tam");

create index if not exists  PUBLIC."taraflar_taraflar_id_index"
    on PUBLIC."taraflar" ("taraflar_id");

create index if not exists  PUBLIC."taraflar_tel_no_index"
    on PUBLIC."taraflar" ("tel_no");

create index if not exists  PUBLIC."taraflar_vekil_index"
    on PUBLIC."taraflar" ("vekil");

create table if not exists  PUBLIC."tebligatlar"
(
    "barkodNo"        NUMERIC                       default 0  not null,
    "dosyaId"         CHARACTER VARYING(1000000000) default -1 not null,
    "durum"           VARCHAR_IGNORECASE(200),
    "eTebligat"       BOOLEAN                       default FALSE,
    "evrakId"         BIGINT                                   not null,
    "evrakTarihi"     TIMESTAMP WITH TIME ZONE,
    "icerik"          VARCHAR_IGNORECASE(1000000000),
    "isEdited"        BOOLEAN                       default FALSE,
    "isLastState"     TINYINT,
    "gorulmemis"      BOOLEAN                       default TRUE,
    "lastStateTarihi" TIMESTAMP WITH TIME ZONE,
    "muhatap"         VARCHAR_IGNORECASE(1000000000),
    "created_tarihi"  TIMESTAMP WITH TIME ZONE      default CURRENT_TIMESTAMP,
    "tebligatlar_id"  INTEGER auto_increment,
    "dosyaId_tam"     VARCHAR_IGNORECASE(1000000000),
    constraint "tebligatlar_pk2"
        primary key ("evrakId", "dosyaId", "barkodNo"),
    constraint "tebligatlar_dosyalar_dosyaId_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar" ("dosyaId")
            on update cascade on delete cascade,
    constraint "tebligatlar_dosyalar_dosyaId_tam_fk"
        foreign key ("dosyaId_tam") references PUBLIC."dosyalar" ("dosyaId_tam")
            on update cascade on delete cascade
);

create index if not exists  PUBLIC."tebligatlar_created_tarihi_index"
    on PUBLIC."tebligatlar" ("created_tarihi");

create index if not exists  PUBLIC."tebligatlar_dosyaId_tam_index"
    on PUBLIC."tebligatlar" ("dosyaId_tam");

create index if not exists  PUBLIC."tebligatlar_durum_index"
    on PUBLIC."tebligatlar" ("durum");

create index if not exists  PUBLIC."tebligatlar_eTebligat_index"
    on PUBLIC."tebligatlar" ("eTebligat");

create index if not exists  PUBLIC."tebligatlar_evrakTarihi_index"
    on PUBLIC."tebligatlar" ("evrakTarihi");

create index if not exists  PUBLIC."tebligatlar_gorulmemis_index"
    on PUBLIC."tebligatlar" ("gorulmemis");

create index if not exists  PUBLIC."tebligatlar_icerik_index"
    on PUBLIC."tebligatlar" ("icerik");

create index if not exists  PUBLIC."tebligatlar_isEdited_index"
    on PUBLIC."tebligatlar" ("isEdited");

create index if not exists  PUBLIC."tebligatlar_isLastState_index"
    on PUBLIC."tebligatlar" ("isLastState");

create index if not exists  PUBLIC."tebligatlar_lastStateTarihi_index"
    on PUBLIC."tebligatlar" ("lastStateTarihi");

create index if not exists  PUBLIC."tebligatlar_muhatap_index"
    on PUBLIC."tebligatlar" ("muhatap");

create index if not exists  PUBLIC."tebligatlar_tebligatlar_id_index"
    on PUBLIC."tebligatlar" ("tebligatlar_id");

create table if not exists PUBLIC."versioning"
(
    "version"       DOUBLE PRECISION default 1,
    "versioning_id" INTEGER auto_increment,
    primary key ("versioning_id")
);

create table if not exists PUBLIC."yedekler"
(
    "yedekler_id"     INTEGER auto_increment,
    "filePath"        CHARACTER VARYING(1000000000)                      not null,
    "isUploaded"      BOOLEAN                  default FALSE             not null,
    "created_tarihi"  TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP not null,
    "uploaded_tarihi" TIMESTAMP WITH TIME ZONE,
    "upload_id"       CHARACTER VARYING(1000000000)                      not null,
    constraint "yedekler_pk"
        primary key ("filePath")
);

create index if not exists PUBLIC."yedekler_created_tarihi_index"
    on PUBLIC."yedekler" ("created_tarihi");

create index if not exists PUBLIC."yedekler_isUploaded_index"
    on PUBLIC."yedekler" ("isUploaded");

create index if not exists PUBLIC."yedekler_upload_id_index"
    on PUBLIC."yedekler" ("upload_id");

create index if not exists PUBLIC."yedekler_uploaded_tarihi_index"
    on PUBLIC."yedekler" ("uploaded_tarihi");
TRUNCATE TABLE PUBLIC."versioning";
INSERT INTO PUBLIC."versioning" ("version") VALUES ( 2.0 );
