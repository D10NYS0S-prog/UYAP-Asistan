create index if not exists PUBLIC."evraklar_ana_dosyaId_evrakId_birimEvrakNo_anaEvrakId_index"
    on PUBLIC."evraklar" ("ana_dosyaId", "evrakId", "birimEvrakNo", "anaEvrakId");

create index if not exists PUBLIC."evraklar_sistemeGonderildigiTarih_onaylandigiTarih_created_tarihi_index"
    on PUBLIC."evraklar" ("sistemeGonderildigiTarih" desc, "onaylandigiTarih" desc, "created_tarihi" desc);

create index if not exists PUBLIC."tebligatlar_icerik_gorulmemis_muhatap_isLastState_index"
    on PUBLIC."tebligatlar" ("icerik", "gorulmemis", "muhatap", "isLastState");

TRUNCATE TABLE PUBLIC."versioning";
INSERT INTO PUBLIC."versioning" ("version") VALUES ( 3.0 );
