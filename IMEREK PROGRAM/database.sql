create table PUBLIC."calisma_grubu"
(
    "username"         CHARACTER VARYING(50) not null,
    "adi"              VARCHAR_IGNORECASE(50),
    "soyadi"           VARCHAR_IGNORECASE(50),
    "avukat_id"        BIGINT(64),
    "calisma_grubu_id" INTEGER(32) auto_increment,
    constraint "calisma_grubu_pk2"
        primary key ("username")
);

create index PUBLIC."calisma_grubu_adi_index"
    on PUBLIC."calisma_grubu" ("adi");

create index PUBLIC."calisma_grubu_avukat_id_index"
    on PUBLIC."calisma_grubu" ("avukat_id");

create index PUBLIC."calisma_grubu_soyadi_index"
    on PUBLIC."calisma_grubu" ("soyadi");

create table PUBLIC."dosyalar"
(
    "dosyaNo"                                       VARCHAR_IGNORECASE(1000000000),
    "dosyaAcilisTarihi"                             TIMESTAMP WITH TIME ZONE,
    "birimId"                                       BIGINT(64)                            not null,
    "birimAdi"                                      VARCHAR_IGNORECASE(1000000000),
    "birimTuru1"                                    VARCHAR_IGNORECASE(1000000000),
    "birimTuru2"                                    VARCHAR_IGNORECASE(1000000000),
    "birimTuru3"                                    VARCHAR_IGNORECASE(1000000000),
    "isNew"                                         BOOLEAN,
    "isDavaDosyasiAcilmisMi"                        BOOLEAN,
    "dosyaTurKod"                                   SMALLINT(16),
    "dosyaDurum"                                    VARCHAR_IGNORECASE(1000000000),
    "dosyaTur"                                      VARCHAR_IGNORECASE(1000000000),
    "table_name"                                    VARCHAR_IGNORECASE(50),
    "created_tarihi"                                TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "gorulmemis"                                    BOOLEAN                  default TRUE,
    "dosyalar_id"                                   INTEGER(32) auto_increment,
    "is_aktif"                                      BOOLEAN                  default TRUE not null,
    "label"                                         VARCHAR_IGNORECASE(1000000000),
    "dosyaDurumKod"                                 INTEGER(32),
    "dosyaTuru"                                     SMALLINT(16),
    "durumAdi"                                      VARCHAR_IGNORECASE(1000000000),
    "esasNo"                                        VARCHAR_IGNORECASE(1000000000),
    "gelisTarihi"                                   TIMESTAMP WITH TIME ZONE,
    "ilislikiDosyaListesi"                          VARCHAR_IGNORECASE(1000000000),
    "mahkemeBirimAdi"                               VARCHAR_IGNORECASE(1000000000),
    "mahkemeEsasNo"                                 VARCHAR_IGNORECASE(1000000000),
    "mahkemeKararNo"                                VARCHAR_IGNORECASE(1000000000),
    "mahkemeKararTarihi"                            TIMESTAMP WITH TIME ZONE,
    "savcilikOncelikDilekceSonuc"                   VARCHAR_IGNORECASE(1000000000),
    "savcilikTarihi"                                TIMESTAMP WITH TIME ZONE,
    "teblignameNo"                                  VARCHAR_IGNORECASE(1000000000),
    "kararTarihi"                                   TIMESTAMP WITH TIME ZONE,
    "kapatmaTarihi"                                 TIMESTAMP WITH TIME ZONE,
    "davaSucTuruAdi"                                VARCHAR_IGNORECASE(1000000000),
    "dosyaId_tam"                                   CHARACTER VARYING(1000000000),
    "eskiAd"                                        VARCHAR_IGNORECASE(1000000000),
    "eskiOrgKod"                                    VARCHAR_IGNORECASE(1000000000),
    "evraginBirimDVODaGonderilecegiBirimBilgisi"    BIGINT(64),
    "isTumunuKopyala"                               BOOLEAN,
    "orgKoduDegisti"                                BOOLEAN,
    "taranmamisKaydetme"                            VARCHAR_IGNORECASE(1000000000),
    "testMi"                                        SMALLINT(16),
    "yeniBirimEkle"                                 BOOLEAN,
    "dosyaTurAciklama"                              VARCHAR_IGNORECASE(1000000000),
    "genelDosyaDurumu"                              VARCHAR_IGNORECASE(1000000000),
    "danistayDairesi"                               BIGINT(64),
    "hash"                                          CHARACTER VARYING(500) not null,
    "isSorusturmaDosyasiIncelemeTalebiKabulEdilmis" BOOLEAN,
    "is_taraf_aktif"                                BOOLEAN                  default TRUE,
    "is_ayrinti_aktif"                              BOOLEAN                  default TRUE,
    "is_evrak_aktif"                                BOOLEAN                  default TRUE,
    "is_tahsilat_aktif"                             BOOLEAN                  default TRUE,
    "dosyaKapanisTarihi"                            TIMESTAMP WITH TIME ZONE,
    "is_borclu_aktif"                               INTEGER(32),
    constraint "dosyalar_pk"
        primary key ("hash"),
    unique ("dosyaId_tam")
);

create table PUBLIC."borclu_bilgileri"
(
    "gorulmemis"               BOOLEAN                  default TRUE not null,
    "dosyaId"                  CHARACTER VARYING(1000000000) not null,
    "kisiKurumId"              BIGINT(64)                            not null,
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
    "sorguTuru"                SMALLINT(16),
    "soyadi"                   VARCHAR_IGNORECASE(1000000000),
    "tcKimlikNo"               BIGINT(64),
    "turu"                     SMALLINT(16),
    "is_takip_kesin"           BOOLEAN                  default FALSE,
    "islemSonucu"              VARCHAR_IGNORECASE(1000000000),
    "borclu_bilgileri_id"      INTEGER(32) auto_increment,
    "created_tarihi"           TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    constraint "borclu_bilgileri_pk"
        primary key ("dosyaId", "kisiKurumId"),
    constraint "borclu_bilgileri_dosyalar_hash_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar"
            on update cascade on delete cascade
);

create index PUBLIC.BORCLU_BILGILERI_CREATED_TARIHI_INDEX
    on PUBLIC."borclu_bilgileri" ("created_tarihi");

create index PUBLIC."borclu_bilgileri_adi_index"
    on PUBLIC."borclu_bilgileri" ("adi");

create index PUBLIC."borclu_bilgileri_aktifMernisAdresiSorgusu_index"
    on PUBLIC."borclu_bilgileri" ("aktifMernisAdresiSorgusu");

create index PUBLIC."borclu_bilgileri_anaAdi_index"
    on PUBLIC."borclu_bilgileri" ("anaAdi");

create index PUBLIC."borclu_bilgileri_babaAdi_index"
    on PUBLIC."borclu_bilgileri" ("babaAdi");

create index PUBLIC."borclu_bilgileri_borclu_bilgileri_id_index"
    on PUBLIC."borclu_bilgileri" ("borclu_bilgileri_id");

create index PUBLIC."borclu_bilgileri_dogumTarihiStr_index"
    on PUBLIC."borclu_bilgileri" ("dogumTarihiStr");

create index PUBLIC."borclu_bilgileri_gorulmemis_index"
    on PUBLIC."borclu_bilgileri" ("gorulmemis");

create index PUBLIC."borclu_bilgileri_hasOlumKaydi_index"
    on PUBLIC."borclu_bilgileri" ("hasOlumKaydi");

create index PUBLIC."borclu_bilgileri_is_takip_kesin_index"
    on PUBLIC."borclu_bilgileri" ("is_takip_kesin");

create index PUBLIC."borclu_bilgileri_islemSonucu_index"
    on PUBLIC."borclu_bilgileri" ("islemSonucu");

create index PUBLIC."borclu_bilgileri_olumKaydi_index"
    on PUBLIC."borclu_bilgileri" ("olumKaydi");

create index PUBLIC."borclu_bilgileri_sorguTuru_index"
    on PUBLIC."borclu_bilgileri" ("sorguTuru");

create index PUBLIC."borclu_bilgileri_soyadi_index"
    on PUBLIC."borclu_bilgileri" ("soyadi");

create index PUBLIC."borclu_bilgileri_tcKimlikNo_index"
    on PUBLIC."borclu_bilgileri" ("tcKimlikNo");

create index PUBLIC."borclu_bilgileri_turu_index"
    on PUBLIC."borclu_bilgileri" ("turu");

create table PUBLIC."borclu_sorgulari"
(
    "borclu_sorgulari_id" INTEGER(32) auto_increment,
    "dosyaId"             VARCHAR_IGNORECASE(1000000000)                     not null,
    "kisiKurumId"         BIGINT(64)                                         not null,
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

create index PUBLIC."borclu_sorgulari_sorgu_sonucu_index"
    on PUBLIC."borclu_sorgulari" ("sorgu_sonucu");

create table PUBLIC."dosya_ayrintilar"
(
    "dosyaId"             CHARACTER VARYING(1000000000) not null,
    "key"                 VARCHAR_IGNORECASE(1000000000)                     not null,
    "val"                 VARCHAR_IGNORECASE(1000000000)                     not null,
    "created_tarihi"      TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP not null,
    "dosya_ayrintilar_id" INTEGER(32) auto_increment,
    "is_aktif"            BOOLEAN                  default TRUE,
    constraint "dosya_ayrintilar_pk"
        primary key ("key", "val", "dosyaId"),
    constraint "dosya_ayrintilar_dosyalar_hash_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar"
            on update cascade on delete cascade
);

create index PUBLIC."dosya_ayrintilar_dosya_ayrintilar_id_index"
    on PUBLIC."dosya_ayrintilar" ("dosya_ayrintilar_id");

create index PUBLIC."dosya_ayrintilar_is_aktif_index"
    on PUBLIC."dosya_ayrintilar" ("is_aktif");

create index PUBLIC.DOSYALAR_IS_BORCLU_AKTIF_INDEX
    on PUBLIC."dosyalar" ("is_borclu_aktif");

create index PUBLIC."dosyalar_birimAdi_index"
    on PUBLIC."dosyalar" ("birimAdi");

create index PUBLIC."dosyalar_birimId_index"
    on PUBLIC."dosyalar" ("birimId");

create index PUBLIC."dosyalar_birimTuru1_index"
    on PUBLIC."dosyalar" ("birimTuru1");

create index PUBLIC."dosyalar_birimTuru2_index"
    on PUBLIC."dosyalar" ("birimTuru2");

create index PUBLIC."dosyalar_birimTuru3_index"
    on PUBLIC."dosyalar" ("birimTuru3");

create index PUBLIC."dosyalar_created_tarihi_index"
    on PUBLIC."dosyalar" ("created_tarihi");

create index PUBLIC."dosyalar_danistayDairesi_index"
    on PUBLIC."dosyalar" ("danistayDairesi");

create index PUBLIC."dosyalar_davaSucTuruAdi_index"
    on PUBLIC."dosyalar" ("davaSucTuruAdi");

create index PUBLIC."dosyalar_dosyaAcilisTarihi_index"
    on PUBLIC."dosyalar" ("dosyaAcilisTarihi");

create index PUBLIC."dosyalar_dosyaDurumKod_index"
    on PUBLIC."dosyalar" ("dosyaDurumKod");

create index PUBLIC."dosyalar_dosyaKapanisTarihi_index"
    on PUBLIC."dosyalar" ("dosyaKapanisTarihi");

create index PUBLIC."dosyalar_dosyaNo_index"
    on PUBLIC."dosyalar" ("dosyaNo");

create index PUBLIC."dosyalar_dosyaTurAciklama_index"
    on PUBLIC."dosyalar" ("dosyaTurAciklama");

create index PUBLIC."dosyalar_dosyaTurKod_index"
    on PUBLIC."dosyalar" ("dosyaTurKod");

create index PUBLIC."dosyalar_dosyaTur_index"
    on PUBLIC."dosyalar" ("dosyaTur");

create index PUBLIC."dosyalar_dosyaTuru_index"
    on PUBLIC."dosyalar" ("dosyaTuru");

create index PUBLIC."dosyalar_dosyalar_id_index"
    on PUBLIC."dosyalar" ("dosyalar_id");

create index PUBLIC."dosyalar_durumAdi_index"
    on PUBLIC."dosyalar" ("dosyaDurum");

create index PUBLIC."dosyalar_durumAdi_index2"
    on PUBLIC."dosyalar" ("durumAdi");

create index PUBLIC."dosyalar_esasNo_index"
    on PUBLIC."dosyalar" ("esasNo");

create index PUBLIC."dosyalar_gelisTarihi_index"
    on PUBLIC."dosyalar" ("gelisTarihi");

create index PUBLIC."dosyalar_genelDosyaDurumu_index"
    on PUBLIC."dosyalar" ("genelDosyaDurumu");

create index PUBLIC."dosyalar_gorulmemis_index"
    on PUBLIC."dosyalar" ("gorulmemis");

create index PUBLIC."dosyalar_isDavaDosyasiAcilmisMi_index"
    on PUBLIC."dosyalar" ("isDavaDosyasiAcilmisMi");

create index PUBLIC."dosyalar_isNew_index"
    on PUBLIC."dosyalar" ("isNew");

create index PUBLIC."dosyalar_isSorusturmaDosyasiIncelemeTalebiKabulEdilmis_index"
    on PUBLIC."dosyalar" ("isSorusturmaDosyasiIncelemeTalebiKabulEdilmis");

create index PUBLIC."dosyalar_is_aktif_index"
    on PUBLIC."dosyalar" ("is_aktif");

create index PUBLIC."dosyalar_is_ayrinti_aktif_index"
    on PUBLIC."dosyalar" ("is_ayrinti_aktif");

create index PUBLIC."dosyalar_is_evrak_aktif_index"
    on PUBLIC."dosyalar" ("is_evrak_aktif");

create index PUBLIC."dosyalar_is_tahsilat_aktif_index"
    on PUBLIC."dosyalar" ("is_tahsilat_aktif");

create index PUBLIC."dosyalar_is_taraf_aktif_index"
    on PUBLIC."dosyalar" ("is_taraf_aktif");

create index PUBLIC."dosyalar_kapatmaTarihi_index"
    on PUBLIC."dosyalar" ("kapatmaTarihi");

create index PUBLIC."dosyalar_kararTarihi_index"
    on PUBLIC."dosyalar" ("kararTarihi");

create index PUBLIC."dosyalar_label_index"
    on PUBLIC."dosyalar" ("label");

create index PUBLIC."dosyalar_mahkemeBirimAdi_index"
    on PUBLIC."dosyalar" ("mahkemeBirimAdi");

create index PUBLIC."dosyalar_mahkemeEsasNo_index"
    on PUBLIC."dosyalar" ("mahkemeEsasNo");

create index PUBLIC."dosyalar_table_name_index"
    on PUBLIC."dosyalar" ("table_name");

create table PUBLIC."durusmalar"
(
    "birimTuru3"                VARCHAR_IGNORECASE(15),
    "birimId"                   BIGINT(64) not null,
    "birimOrgKodu"              VARCHAR_IGNORECASE(1000000000),
    "birimTuru1"                VARCHAR_IGNORECASE(15),
    "birimTuru2"                VARCHAR_IGNORECASE(15),
    "dosyaId"                   CHARACTER VARYING(1000000000) not null,
    "dosyaNo"                   VARCHAR_IGNORECASE(1000000000),
    "dosyaTurKod"               SMALLINT(16),
    "dosyaTurKodAciklama"       VARCHAR_IGNORECASE(1000000000),
    "hakimHeyet"                SMALLINT(16),
    "isEDurusmaBirimTalepValid" BOOLEAN,
    "isEDurusmaGuncellenecek"   BOOLEAN,
    "isEDurusmaSaatTalepValid"  BOOLEAN,
    "islemSonucu"               SMALLINT(16),
    "islemSonucuAciklama"       VARCHAR_IGNORECASE(1000000000),
    "islemTuru"                 SMALLINT(16),
    "islemTuruAciklama"         VARCHAR_IGNORECASE(1000000000),
    "izinliHakimList"           JSON,
    "katilButonAktifMi"         BOOLEAN,
    "kayitId"                   BIGINT(64) not null,
    "talepDurumu"               VARCHAR_IGNORECASE(1000000000),
    "tarihSaat"                 TIMESTAMP WITH TIME ZONE,
    "yerelBirimAd"              VARCHAR_IGNORECASE(1000000000),
    "created_tarihi"            TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "durusmalar_id"             INTEGER(32) auto_increment,
    "token"                     CHARACTER VARYING(1000000000),
    constraint "durusmalar_pk2"
        primary key ("kayitId", "birimId")
);

create index PUBLIC."durusmalar_birimTuru1_index"
    on PUBLIC."durusmalar" ("birimTuru1");

create index PUBLIC."durusmalar_birimTuru2_index"
    on PUBLIC."durusmalar" ("birimTuru2");

create index PUBLIC."durusmalar_birimTuru3_index"
    on PUBLIC."durusmalar" ("birimTuru3");

create index PUBLIC."durusmalar_dosyaId_index"
    on PUBLIC."durusmalar" ("dosyaId");

create index PUBLIC."durusmalar_dosyaNo_index"
    on PUBLIC."durusmalar" ("dosyaNo");

create index PUBLIC."durusmalar_dosyaTurKodAciklama_index"
    on PUBLIC."durusmalar" ("dosyaTurKodAciklama");

create index PUBLIC."durusmalar_dosyaTurKod_index"
    on PUBLIC."durusmalar" ("dosyaTurKod");

create index PUBLIC."durusmalar_durusmalar_id_index"
    on PUBLIC."durusmalar" ("durusmalar_id");

create index PUBLIC."durusmalar_islemSonucuAciklama_index"
    on PUBLIC."durusmalar" ("islemSonucuAciklama");

create index PUBLIC."durusmalar_islemSonucu_index"
    on PUBLIC."durusmalar" ("islemSonucu");

create index PUBLIC."durusmalar_islemTuruAciklama_index"
    on PUBLIC."durusmalar" ("islemTuruAciklama");

create index PUBLIC."durusmalar_islemTuru_index"
    on PUBLIC."durusmalar" ("islemTuru");

create index PUBLIC."durusmalar_tarihSaat_index"
    on PUBLIC."durusmalar" ("tarihSaat");

create index PUBLIC."durusmalar_yerelBirimAd_index"
    on PUBLIC."durusmalar" ("yerelBirimAd");

create table PUBLIC."evraklar"
(
    "aciklama"                 VARCHAR_IGNORECASE(1000000000),
    "birimEvrakNo"             INTEGER(32)              default 0    not null,
    "dosyaId"                  CHARACTER VARYING(1000000000) not null,
    "downloadId"               SMALLINT(16)             default 0    not null,
    "evrakId"                  BIGINT(64)                            not null,
    "gonderenDosyaNo"          VARCHAR_IGNORECASE(1000000000),
    "gonderenSayi"             VARCHAR_IGNORECASE(1000000000),
    "gonderenYerKisi"          VARCHAR_IGNORECASE(1000000000),
    "onaylandigiTarih"         TIMESTAMP WITH TIME ZONE,
    "sistemeGonderildigiTarih" TIMESTAMP WITH TIME ZONE,
    "tip"                      VARCHAR_IGNORECASE(1000000000),
    "tur"                      VARCHAR_IGNORECASE(1000000000),
    "anaEvrakId"               BIGINT(64)               default 0    not null,
    "created_tarihi"           TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "gorulmemis"               BOOLEAN                  default TRUE,
    "evraklar_id"              INTEGER(32) auto_increment,
    "label"                    VARCHAR_IGNORECASE(1000000000),
    "is_aktif"                 BOOLEAN                  default TRUE not null,
    "ggEvrakId"                BIGINT(64),
    "isYetkili"                BOOLEAN,
    "ana_dosyaId"              CHARACTER VARYING(500) not null,
    "sira"                     BIGINT(64),
    "alt_dosyaNo"              VARCHAR_IGNORECASE(100),
    "alt_dosyaTur"             VARCHAR_IGNORECASE(1000000000),
    constraint "evraklar_pk"
        primary key ("evrakId", "birimEvrakNo", "anaEvrakId", "dosyaId", "ana_dosyaId"),
    constraint "evraklar_dosyalar_hash_fk"
        foreign key ("ana_dosyaId") references PUBLIC."dosyalar"
            on update cascade on delete cascade
);

create index PUBLIC."evraklar_aciklama_index"
    on PUBLIC."evraklar" ("aciklama");

create index PUBLIC."evraklar_anaEvrakId_index"
    on PUBLIC."evraklar" ("anaEvrakId");

create index PUBLIC."evraklar_ana_dosyaId_index"
    on PUBLIC."evraklar" ("ana_dosyaId");

create index PUBLIC."evraklar_created_tarihi_index"
    on PUBLIC."evraklar" ("created_tarihi" desc);

create index PUBLIC."evraklar_downloadId_index"
    on PUBLIC."evraklar" ("downloadId");

create index PUBLIC."evraklar_evraklar_id_index"
    on PUBLIC."evraklar" ("evraklar_id");

create index PUBLIC."evraklar_gorulmemis_index"
    on PUBLIC."evraklar" ("gorulmemis");

create index PUBLIC."evraklar_is_aktif_index"
    on PUBLIC."evraklar" ("is_aktif");

create index PUBLIC."evraklar_label_index"
    on PUBLIC."evraklar" ("label");

create index PUBLIC."evraklar_onayTarihi_index"
    on PUBLIC."evraklar" ("onaylandigiTarih" desc);

create index PUBLIC."evraklar_sira_index"
    on PUBLIC."evraklar" ("sira");

create index PUBLIC."evraklar_sistemTarihi_index"
    on PUBLIC."evraklar" ("sistemeGonderildigiTarih" desc);

create index PUBLIC."evraklar_sistemeGonderildigiTarih_onaylandigiTarih_created_tarihi_index"
    on PUBLIC."evraklar" ("sistemeGonderildigiTarih" desc, "onaylandigiTarih" desc, "created_tarihi" desc);

create index PUBLIC."evraklar_tipi_index"
    on PUBLIC."evraklar" ("tip");

create index PUBLIC."evraklar_turu_index"
    on PUBLIC."evraklar" ("tur");

create table PUBLIC."harcTahsilatAyrinti"
(
    "dosyaId"                CHARACTER VARYING(1000000000) not null,
    "created_tarihi"         TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "harcTahsilatAyrinti_id" INTEGER(32) auto_increment,
    "harc_tahsilat_reddiyat" SMALLINT(16)             default 0 not null,
    "birimAdi"               VARCHAR_IGNORECASE(1000000000),
    "dosyaNo"                VARCHAR_IGNORECASE(1000000000),
    "dosyaTurAciklama"       VARCHAR_IGNORECASE(1000000000),
    "kayitId"                BIGINT(64),
    "makbuzNo"               BIGINT(64),
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

create index PUBLIC."harcTahsilatAyrinti_birimAdi_index"
    on PUBLIC."harcTahsilatAyrinti" ("birimAdi");

create index PUBLIC."harcTahsilatAyrinti_created_tarihi_index"
    on PUBLIC."harcTahsilatAyrinti" ("created_tarihi");

create index PUBLIC."harcTahsilatAyrinti_dosyaNo_index"
    on PUBLIC."harcTahsilatAyrinti" ("dosyaNo");

create index PUBLIC."harcTahsilatAyrinti_dosyaTurAciklama_index"
    on PUBLIC."harcTahsilatAyrinti" ("dosyaTurAciklama");

create index PUBLIC."harcTahsilatAyrinti_harc_tahsilat_ayrinti_id_index"
    on PUBLIC."harcTahsilatAyrinti" ("harcTahsilatAyrinti_id");

create index PUBLIC."harcTahsilatAyrinti_makbuzNo_index"
    on PUBLIC."harcTahsilatAyrinti" ("makbuzNo");

create index PUBLIC."harcTahsilatAyrinti_miktar_index"
    on PUBLIC."harcTahsilatAyrinti" ("miktar");

create index PUBLIC."harcTahsilatAyrinti_odeyenKisi_index"
    on PUBLIC."harcTahsilatAyrinti" ("odeyenKisi");

create index PUBLIC."harcTahsilatAyrinti_reddiyatNedeni_index"
    on PUBLIC."harcTahsilatAyrinti" ("reddiyatNedeni");

create index PUBLIC."harcTahsilatAyrinti_reddiyatTarihi_index"
    on PUBLIC."harcTahsilatAyrinti" ("reddiyatTarihi");

create index PUBLIC."harcTahsilatAyrinti_tahsilatTarihi_index"
    on PUBLIC."harcTahsilatAyrinti" ("tahsilatTarihi");

create index PUBLIC."harcTahsilatAyrinti_tahsilatTuru_index"
    on PUBLIC."harcTahsilatAyrinti" ("tahsilatTuru");

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
    "harcTahsilatToplam_id" INTEGER(32) auto_increment,
    "isIcraMi"              BOOLEAN,
    constraint "harcTahsilatToplam_pk"
        primary key ("dosyaId"),
    constraint "harcTahsilatToplam_dosyalar_hash_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar"
            on update cascade on delete cascade
);

create index PUBLIC."harcTahsilatToplam_created_tarihi_index"
    on PUBLIC."harcTahsilatToplam" ("created_tarihi");

create index PUBLIC."harcTahsilatToplam_harc_tahsilat_toplam_id_index"
    on PUBLIC."harcTahsilatToplam" ("harcTahsilatToplam_id");

create index PUBLIC."harcTahsilatToplam_haricen_index"
    on PUBLIC."harcTahsilatToplam" ("haricen");

create index PUBLIC."harcTahsilatToplam_isIcraMi_index"
    on PUBLIC."harcTahsilatToplam" ("isIcraMi");

create index PUBLIC."harcTahsilatToplam_toplamKalan_index"
    on PUBLIC."harcTahsilatToplam" ("toplamKalan");

create index PUBLIC."harcTahsilatToplam_toplamTahsilHarci_index"
    on PUBLIC."harcTahsilatToplam" ("toplamTahsilHarci");

create index PUBLIC."harcTahsilatToplam_toplamTahsilat_index"
    on PUBLIC."harcTahsilatToplam" ("toplamTahsilat");

create index PUBLIC."harcTahsilatToplam_toplamTeminat_index"
    on PUBLIC."harcTahsilatToplam" ("toplamTeminat");

create index PUBLIC."harcTahsilatToplam_toplamreddiyat_index"
    on PUBLIC."harcTahsilatToplam" ("toplamreddiyat");

create table PUBLIC."harici_evraklar"
(
    "filePath"           VARCHAR_IGNORECASE(1000000000),
    "dosyaId"            BIGINT(64),
    "hiddennumber"       INTEGER(32),
    "harici_evraklar_id" INTEGER(32) auto_increment,
    "aciklama"           CHARACTER VARYING(1000000000),
    constraint "harici_evraklar_pk"
        primary key ("harici_evraklar_id")
);

create index PUBLIC."harici_evraklar_aciklama_index"
    on PUBLIC."harici_evraklar" ("aciklama");

create index PUBLIC."harici_evraklar_dosyaId_index"
    on PUBLIC."harici_evraklar" ("dosyaId");

create index PUBLIC."harici_evraklar_filePath_index"
    on PUBLIC."harici_evraklar" ("filePath");

create index PUBLIC."harici_evraklar_hiddennumber_index"
    on PUBLIC."harici_evraklar" ("hiddennumber");

create table PUBLIC."harici_tebligatlar"
(
    "barkodNo"              NUMERIC(100000)          default 0 not null,
    "durum"                 VARCHAR_IGNORECASE(200),
    "eTebligat"             BOOLEAN                  default FALSE,
    "evrakTarihi"           TIMESTAMP WITH TIME ZONE,
    "icerik"                VARCHAR_IGNORECASE(1000000000),
    "isLastState"           TINYINT(8),
    "gorulmemis"            BOOLEAN                  default TRUE,
    "lastStateTarihi"       TIMESTAMP WITH TIME ZONE,
    "muhatap"               VARCHAR_IGNORECASE(1000000000),
    "created_tarihi"        TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "harici_tebligatlar_id" INTEGER(32) auto_increment,
    constraint "harici_tebligatlar_pk"
        primary key ("barkodNo")
);

create index PUBLIC."harici_tebligatlar_created_tarihi_index"
    on PUBLIC."harici_tebligatlar" ("created_tarihi");

create index PUBLIC."harici_tebligatlar_durum_index"
    on PUBLIC."harici_tebligatlar" ("durum");

create index PUBLIC."harici_tebligatlar_eTebligat_index"
    on PUBLIC."harici_tebligatlar" ("eTebligat");

create index PUBLIC."harici_tebligatlar_evrakTarihi_index"
    on PUBLIC."harici_tebligatlar" ("evrakTarihi");

create index PUBLIC."harici_tebligatlar_gorulmemis_index"
    on PUBLIC."harici_tebligatlar" ("gorulmemis");

create index PUBLIC."harici_tebligatlar_harici_tebligatlar_id_index"
    on PUBLIC."harici_tebligatlar" ("harici_tebligatlar_id");

create index PUBLIC."harici_tebligatlar_icerik_index"
    on PUBLIC."harici_tebligatlar" ("icerik");

create index PUBLIC."harici_tebligatlar_isLastState_index"
    on PUBLIC."harici_tebligatlar" ("isLastState");

create index PUBLIC."harici_tebligatlar_lastStateTarihi_index"
    on PUBLIC."harici_tebligatlar" ("lastStateTarihi");

create index PUBLIC."harici_tebligatlar_muhatap_index"
    on PUBLIC."harici_tebligatlar" ("muhatap");

create table PUBLIC."ihaleler"
(
    "tarihAraligi_1"   TIMESTAMP WITH TIME ZONE,
    "tarihAraligi_2"   TIMESTAMP WITH TIME ZONE,
    "ihaleKayitId"     BIGINT(64) not null,
    "malTip"           VARCHAR_IGNORECASE(1000000000),
    "satisYeri"        VARCHAR_IGNORECASE(1000000000),
    "satisiYapanBirim" VARCHAR_IGNORECASE(1000000000),
    "dosyaNo"          VARCHAR_IGNORECASE(1000000000),
    "dosyaTuru"        VARCHAR_IGNORECASE(1000000000),
    "satisSirasi"      VARCHAR_IGNORECASE(1000000000),
    "eIlanDurumu"      INTEGER(32),
    "created_tarihi"   TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "ihaleler_id"      INTEGER(32) auto_increment,
    "satisDurumu"      VARCHAR_IGNORECASE(1000000000),
    constraint "ihaleler_pk"
        primary key ("ihaleKayitId")
);

create index PUBLIC."ihaleler_created_tarihi_index"
    on PUBLIC."ihaleler" ("created_tarihi");

create index PUBLIC."ihaleler_dosyaNo_index"
    on PUBLIC."ihaleler" ("dosyaNo");

create index PUBLIC."ihaleler_dosyaTuru_index"
    on PUBLIC."ihaleler" ("dosyaTuru");

create index PUBLIC."ihaleler_eIlanDurumu_index"
    on PUBLIC."ihaleler" ("eIlanDurumu");

create index PUBLIC."ihaleler_ihaleler_id_index"
    on PUBLIC."ihaleler" ("ihaleler_id");

create index PUBLIC."ihaleler_satisDurumu_index"
    on PUBLIC."ihaleler" ("satisDurumu");

create index PUBLIC."ihaleler_satisYeri_index"
    on PUBLIC."ihaleler" ("satisYeri");

create index PUBLIC."ihaleler_satisiYapanBirim_index"
    on PUBLIC."ihaleler" ("satisiYapanBirim");

create index PUBLIC."ihaleler_tarihAraligi__1_index"
    on PUBLIC."ihaleler" ("tarihAraligi_1");

create index PUBLIC."ihaleler_tarihAraligi__2_index"
    on PUBLIC."ihaleler" ("tarihAraligi_2");

create table PUBLIC."messages"
(
    "messages_id"     BIGINT(64) auto_increment,
    "gonderen"        VARCHAR_IGNORECASE(50),
    "alan"            VARCHAR_IGNORECASE(50),
    "mesaj"           VARCHAR_IGNORECASE(1000000000),
    "okundu_flag"     BOOLEAN                  default FALSE,
    "aktif_flag_alan" BOOLEAN                  default TRUE,
    "type"            VARCHAR_IGNORECASE(1000000000),
    "type_id"         BIGINT(64),
    "created_tarihi"  TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "okundu_tarihi"   TIMESTAMP WITH TIME ZONE,
    constraint "messages_pk"
        primary key ("messages_id"),
    constraint "messages_calisma_grubu_username_fk"
        foreign key ("alan") references PUBLIC."calisma_grubu"
            on update cascade on delete cascade
);

create index PUBLIC."messages_aktif_flag_alan_index"
    on PUBLIC."messages" ("aktif_flag_alan");

create index PUBLIC."messages_created_tarihi_index"
    on PUBLIC."messages" ("created_tarihi");

create index PUBLIC."messages_gonderen_index"
    on PUBLIC."messages" ("gonderen");

create index PUBLIC."messages_okundu_flag_index"
    on PUBLIC."messages" ("okundu_flag");

create index PUBLIC."messages_okundu_tarihi_index"
    on PUBLIC."messages" ("okundu_tarihi");

create index PUBLIC."messages_type_id_index"
    on PUBLIC."messages" ("type_id");

create index PUBLIC."messages_type_index"
    on PUBLIC."messages" ("type");

create table PUBLIC."muhasebe"
(
    "dosyaId"          CHARACTER VARYING(1000000000) not null,
    "tahsilatAciklama" VARCHAR_IGNORECASE(500),
    "tahsilatTarihi"   TIMESTAMP WITH TIME ZONE,
    "yatirilanMiktar"  NUMERIC(20, 4),
    "tip"              INTEGER(32) default 1 not null,
    "muhasebe_id"      INTEGER(32) auto_increment,
    "creator"          CHARACTER VARYING(50) default 'ADMIN' not null,
    constraint MUHASEBE_PK
        primary key ("muhasebe_id"),
    constraint "muhasebe_dosyalar_hash_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar"
            on update cascade on delete cascade
);

create index PUBLIC."muhasebe_creator_index"
    on PUBLIC."muhasebe" ("creator");

create index PUBLIC."muhasebe_dosyaId_index"
    on PUBLIC."muhasebe" ("dosyaId");

create index PUBLIC."muhasebe_tahsilatAciklama_index"
    on PUBLIC."muhasebe" ("tahsilatAciklama");

create index PUBLIC."muhasebe_tahsilatTarihi_index"
    on PUBLIC."muhasebe" ("tahsilatTarihi");

create index PUBLIC."muhasebe_tip_index"
    on PUBLIC."muhasebe" ("tip");

create index PUBLIC."muhasebe_yatirilanMiktar_index"
    on PUBLIC."muhasebe" ("yatirilanMiktar");

create table PUBLIC."notlar"
(
    "type"            VARCHAR_IGNORECASE(1000000000)                     not null,
    "alinan_not"      VARCHAR_IGNORECASE(1000000000)                     not null,
    "kaynakId"        CHARACTER VARYING(1000000000) not null,
    "created_tarihi"  TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP not null,
    "creator"         CHARACTER VARYING(50) default 'ADMIN' not null,
    "notlar_id"       INTEGER(32) auto_increment,
    "modified_tarihi" TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP not null,
    constraint "notlar_pk"
        primary key ("creator", "type", "kaynakId"),
    constraint "notlar_calisma_grubu_username_fk"
        foreign key ("creator") references PUBLIC."calisma_grubu"
            on update cascade on delete cascade
);

create index PUBLIC."notlar_created_tarihi_index"
    on PUBLIC."notlar" ("created_tarihi");

create index PUBLIC."notlar_modified_tarihi_index"
    on PUBLIC."notlar" ("modified_tarihi");

create index PUBLIC."notlar_notlar_id_index"
    on PUBLIC."notlar" ("notlar_id");

create table PUBLIC."takvim_olaylar"
(
    "type"              VARCHAR_IGNORECASE(20) not null,
    "kaynakId"          CHARACTER VARYING(1000000000) not null,
    "created_tarihi"    TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "takvim_olaylar_id" INTEGER(32) auto_increment,
    "google_event_id"   CHARACTER VARYING(1000000000) not null,
    "google_takvim"     CHARACTER VARYING(1000000000),
    constraint "takvim_olaylar_pk"
        primary key ("google_event_id")
);

create index PUBLIC."takvim_olaylar_created_tarihi_index"
    on PUBLIC."takvim_olaylar" ("created_tarihi");

create index PUBLIC."takvim_olaylar_google_takvim_index"
    on PUBLIC."takvim_olaylar" ("google_takvim");

create index PUBLIC."takvim_olaylar_kaynakId_index"
    on PUBLIC."takvim_olaylar" ("kaynakId");

create index PUBLIC."takvim_olaylar_takvim_olaylar_id_index"
    on PUBLIC."takvim_olaylar" ("takvim_olaylar_id");

create index PUBLIC."takvim_olaylar_type_index"
    on PUBLIC."takvim_olaylar" ("type");

create table PUBLIC."taraflar"
(
    "adi"            VARCHAR_IGNORECASE(1000000000) not null,
    "dosyaId"        CHARACTER VARYING(1000000000) not null,
    "rol"            VARCHAR_IGNORECASE(1000000000) not null,
    "vekil"          JSON,
    "created_tarihi" TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "taraflar_id"    INTEGER(32) auto_increment,
    "tel_no"         VARCHAR_IGNORECASE(1000000000),
    "adres"          JSON,
    "tcKimlikNo"     BIGINT(64),
    "mail"           VARCHAR_IGNORECASE(1000000000),
    constraint "taraflar_pk2"
        primary key ("dosyaId", "adi", "rol"),
    constraint "taraflar_dosyalar_hash_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar"
            on update cascade on delete cascade
);

create index PUBLIC."taraflar_adres_index"
    on PUBLIC."taraflar" ("adres");

create index PUBLIC."taraflar_taraflar_id_index"
    on PUBLIC."taraflar" ("taraflar_id");

create index PUBLIC."taraflar_tcKimlikNo_index"
    on PUBLIC."taraflar" ("tcKimlikNo");

create index PUBLIC."taraflar_tel_no_index"
    on PUBLIC."taraflar" ("tel_no");

create index PUBLIC."taraflar_vekil_index"
    on PUBLIC."taraflar" ("vekil");

create table PUBLIC."tebligatlar"
(
    "barkodNo"        NUMERIC(100000)          default 0 not null,
    "dosyaId"         CHARACTER VARYING(1000000000) not null,
    "durum"           VARCHAR_IGNORECASE(200),
    "eTebligat"       BOOLEAN                  default FALSE,
    "evrakId"         BIGINT(64)                         not null,
    "evrakTarihi"     TIMESTAMP WITH TIME ZONE,
    "icerik"          VARCHAR_IGNORECASE(1000000000),
    "isEdited"        BOOLEAN                  default FALSE,
    "isLastState"     TINYINT(8),
    "gorulmemis"      BOOLEAN                  default TRUE,
    "lastStateTarihi" TIMESTAMP WITH TIME ZONE,
    "muhatap"         VARCHAR_IGNORECASE(1000000000),
    "created_tarihi"  TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP,
    "tebligatlar_id"  INTEGER(32) auto_increment,
    constraint "tebligatlar_pk"
        primary key ("evrakId", "dosyaId", "barkodNo"),
    constraint "tebligatlar_dosyalar_hash_fk"
        foreign key ("dosyaId") references PUBLIC."dosyalar"
            on update cascade on delete cascade
);

create index PUBLIC."tebligatlar_created_tarihi_index"
    on PUBLIC."tebligatlar" ("created_tarihi");

create index PUBLIC."tebligatlar_durum_index"
    on PUBLIC."tebligatlar" ("durum");

create index PUBLIC."tebligatlar_eTebligat_index"
    on PUBLIC."tebligatlar" ("eTebligat");

create index PUBLIC."tebligatlar_evrakTarihi_index"
    on PUBLIC."tebligatlar" ("evrakTarihi");

create index PUBLIC."tebligatlar_gorulmemis_index"
    on PUBLIC."tebligatlar" ("gorulmemis");

create index PUBLIC."tebligatlar_icerik_gorulmemis_muhatap_isLastState_index"
    on PUBLIC."tebligatlar" ("icerik", "gorulmemis", "muhatap", "isLastState");

create index PUBLIC."tebligatlar_icerik_index"
    on PUBLIC."tebligatlar" ("icerik");

create index PUBLIC."tebligatlar_isEdited_index"
    on PUBLIC."tebligatlar" ("isEdited");

create index PUBLIC."tebligatlar_isLastState_index"
    on PUBLIC."tebligatlar" ("isLastState");

create index PUBLIC."tebligatlar_lastStateTarihi_index"
    on PUBLIC."tebligatlar" ("lastStateTarihi");

create index PUBLIC."tebligatlar_muhatap_index"
    on PUBLIC."tebligatlar" ("muhatap");

create index PUBLIC."tebligatlar_tebligatlar_id_index"
    on PUBLIC."tebligatlar" ("tebligatlar_id");

create table PUBLIC."versioning"
(
    "version"       DOUBLE PRECISION(53) default 1,
    "versioning_id" INTEGER(32) auto_increment,
    primary key ("versioning_id")
);

create table PUBLIC."yedekler"
(
    "yedekler_id"     INTEGER(32) auto_increment,
    "filePath"        CHARACTER VARYING(1000000000) not null,
    "isUploaded"      BOOLEAN                  default FALSE             not null,
    "created_tarihi"  TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP not null,
    "uploaded_tarihi" TIMESTAMP WITH TIME ZONE,
    "upload_id"       CHARACTER VARYING(1000000000) not null,
    constraint "yedekler_pk"
        primary key ("yedekler_id")
);

create index PUBLIC."yedekler_created_tarihi_index"
    on PUBLIC."yedekler" ("created_tarihi");

create index PUBLIC."yedekler_isUploaded_index"
    on PUBLIC."yedekler" ("isUploaded");

create index PUBLIC."yedekler_upload_id_index"
    on PUBLIC."yedekler" ("upload_id");

create index PUBLIC."yedekler_uploaded_tarihi_index"
    on PUBLIC."yedekler" ("uploaded_tarihi");

