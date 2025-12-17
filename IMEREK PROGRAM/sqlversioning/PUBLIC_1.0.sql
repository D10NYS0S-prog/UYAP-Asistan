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

create index if not exists PUBLIC."calisma_grubu_adi_index"
    on PUBLIC."calisma_grubu" ("adi");

create index if not exists PUBLIC."calisma_grubu_avukat_id_index"
    on PUBLIC."calisma_grubu" ("avukat_id");

create index if not exists PUBLIC."calisma_grubu_soyadi_index"
    on PUBLIC."calisma_grubu" ("soyadi");

create index if not exists PUBLIC."dosya_ayrintilar_dosyaId_tam_index"
    on PUBLIC."dosya_ayrintilar" ("dosyaId_tam");

create index if not exists PUBLIC."dosya_ayrintilar_is_aktif_index"
    on PUBLIC."dosya_ayrintilar" ("is_aktif");

create index if not exists PUBLIC."dosyalar_birimId_index"
    on PUBLIC."dosyalar" ("birimId");

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

create index if not exists PUBLIC."durusmalar_birimTuru1_index"
    on PUBLIC."durusmalar" ("birimTuru1");

create index if not exists PUBLIC."durusmalar_birimTuru2_index"
    on PUBLIC."durusmalar" ("birimTuru2");

create index if not exists PUBLIC."durusmalar_birimTuru3_index"
    on PUBLIC."durusmalar" ("birimTuru3");

create index if not exists PUBLIC."durusmalar_dosyaId_index"
    on PUBLIC."durusmalar" ("dosyaId");

create index if not exists PUBLIC."durusmalar_dosyaId_tam_index"
    on PUBLIC."durusmalar" ("dosyaId_tam");

create index if not exists PUBLIC."durusmalar_dosyaNo_index"
    on PUBLIC."durusmalar" ("dosyaNo");

create index if not exists PUBLIC."durusmalar_dosyaTurKodAciklama_index"
    on PUBLIC."durusmalar" ("dosyaTurKodAciklama");

create index if not exists PUBLIC."durusmalar_dosyaTurKod_index"
    on PUBLIC."durusmalar" ("dosyaTurKod");

create index if not exists PUBLIC."durusmalar_islemSonucuAciklama_index"
    on PUBLIC."durusmalar" ("islemSonucuAciklama");

create index if not exists PUBLIC."durusmalar_islemSonucu_index"
    on PUBLIC."durusmalar" ("islemSonucu");

create index if not exists PUBLIC."durusmalar_islemTuruAciklama_index"
    on PUBLIC."durusmalar" ("islemTuruAciklama");

create index if not exists PUBLIC."durusmalar_islemTuru_index"
    on PUBLIC."durusmalar" ("islemTuru");

create index if not exists PUBLIC."durusmalar_tarihSaat_index"
    on PUBLIC."durusmalar" ("tarihSaat");

create index if not exists PUBLIC."durusmalar_yerelBirimAd_index"
    on PUBLIC."durusmalar" ("yerelBirimAd");

create index if not exists PUBLIC."evraklar_alt_dosyaNo_index"
    on PUBLIC."evraklar" ("alt_dosyaNo");

create index if not exists PUBLIC."evraklar_alt_dosyaTur_index"
    on PUBLIC."evraklar" ("alt_dosyaTur");

create index if not exists PUBLIC."evraklar_ana_dosyaId_tam_index"
    on PUBLIC."evraklar" ("ana_dosyaId_tam");

create index if not exists PUBLIC."evraklar_dosyaId_tam_index"
    on PUBLIC."evraklar" ("dosyaId_tam");

create index if not exists PUBLIC."evraklar_downloadId_index"
    on PUBLIC."evraklar" ("downloadId");

create index if not exists PUBLIC."evraklar_evraklar_id_index"
    on PUBLIC."evraklar" ("evraklar_id");

create index if not exists PUBLIC."evraklar_ggEvrakId_index"
    on PUBLIC."evraklar" ("ggEvrakId");

create index if not exists PUBLIC."evraklar_gonderenDosyaNo_index"
    on PUBLIC."evraklar" ("gonderenDosyaNo");

create index if not exists PUBLIC."evraklar_gonderenSayi_index"
    on PUBLIC."evraklar" ("gonderenSayi");

create index if not exists PUBLIC."evraklar_gonderenYerKisi_index"
    on PUBLIC."evraklar" ("gonderenYerKisi");

create index if not exists PUBLIC."evraklar_isYetkili_index"
    on PUBLIC."evraklar" ("isYetkili");

create index if not exists PUBLIC."evraklar_is_aktif_index"
    on PUBLIC."evraklar" ("is_aktif");

create index if not exists PUBLIC."evraklar_sira_index"
    on PUBLIC."evraklar" ("sira");

create index if not exists PUBLIC."harcTahsilatAyrinti_birimAdi_index"
    on PUBLIC."harcTahsilatAyrinti" ("birimAdi");

create index if not exists PUBLIC."harcTahsilatAyrinti_created_tarihi_index"
    on PUBLIC."harcTahsilatAyrinti" ("created_tarihi");

create index if not exists PUBLIC."harcTahsilatAyrinti_dosyaId_tam_index"
    on PUBLIC."harcTahsilatAyrinti" ("dosyaId_tam");

create index if not exists PUBLIC."harcTahsilatAyrinti_dosyaNo_index"
    on PUBLIC."harcTahsilatAyrinti" ("dosyaNo");

create index if not exists PUBLIC."harcTahsilatAyrinti_dosyaTurAciklama_index"
    on PUBLIC."harcTahsilatAyrinti" ("dosyaTurAciklama");

create index if not exists PUBLIC."harcTahsilatAyrinti_durumAciklama_index"
    on PUBLIC."harcTahsilatAyrinti" ("durumAciklama");

create index if not exists PUBLIC."harcTahsilatAyrinti_harc_tahsilat_ayrinti_id_index"
    on PUBLIC."harcTahsilatAyrinti" ("harc_tahsilat_ayrinti_id");

create index if not exists PUBLIC."harcTahsilatAyrinti_hesaplamaYapilanTutar_index"
    on PUBLIC."harcTahsilatAyrinti" ("hesaplamaYapilanTutar");

create index if not exists PUBLIC."harcTahsilatAyrinti_isIcraMi_index"
    on PUBLIC."harcTahsilatAyrinti" ("isIcraMi");

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

create index if not exists PUBLIC."harcTahsilatAyrinti_yatirilanMiktar_index"
    on PUBLIC."harcTahsilatAyrinti" ("yatirilanMiktar");

create index if not exists PUBLIC."harcTahsilatToplam_created_tarihi_index"
    on PUBLIC."harcTahsilatToplam" ("created_tarihi");

create index if not exists PUBLIC."harcTahsilatToplam_dosyaId_tam_index"
    on PUBLIC."harcTahsilatToplam" ("dosyaId_tam");

create index if not exists PUBLIC."harcTahsilatToplam_harc_tahsilat_toplam_id_index"
    on PUBLIC."harcTahsilatToplam" ("harc_tahsilat_toplam_id");

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

create index if not exists PUBLIC."harici_evraklar_aciklama_index"
    on PUBLIC."harici_evraklar" ("aciklama");

create index if not exists PUBLIC."harici_evraklar_dosyaId_index"
    on PUBLIC."harici_evraklar" ("dosyaId");

create index if not exists PUBLIC."harici_evraklar_filePath_index"
    on PUBLIC."harici_evraklar" ("filePath");

create index if not exists PUBLIC."harici_evraklar_hiddennumber_index"
    on PUBLIC."harici_evraklar" ("hiddennumber");

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

create index if not exists PUBLIC."harici_tebligatlar_icerik_index"
    on PUBLIC."harici_tebligatlar" ("icerik");

create index if not exists PUBLIC."harici_tebligatlar_isLastState_index"
    on PUBLIC."harici_tebligatlar" ("isLastState");

create index if not exists PUBLIC."harici_tebligatlar_lastStateTarihi_index"
    on PUBLIC."harici_tebligatlar" ("lastStateTarihi");

create index if not exists PUBLIC."harici_tebligatlar_muhatap_index"
    on PUBLIC."harici_tebligatlar" ("muhatap");

create index if not exists PUBLIC."harici_tebligatlar_tebligatlar_id_index"
    on PUBLIC."harici_tebligatlar" ("tebligatlar_id");

alter table PUBLIC."ihaleler"
    alter column "ihaleler_id" INTEGER auto_increment;

create index if not exists PUBLIC."ihaleler_created_tarihi_index"
    on PUBLIC."ihaleler" ("created_tarihi");

create index if not exists PUBLIC."ihaleler_dosyaNo_index"
    on PUBLIC."ihaleler" ("dosyaNo");

create index if not exists PUBLIC."ihaleler_dosyaTuru_index"
    on PUBLIC."ihaleler" ("dosyaTuru");

create index if not exists PUBLIC."ihaleler_eIlanDurumu_index"
    on PUBLIC."ihaleler" ("eIlanDurumu");

create index if not exists PUBLIC."ihaleler_ihaleler_id_index"
    on PUBLIC."ihaleler" ("ihaleler_id");

create index if not exists PUBLIC."ihaleler_satisDurumu_index"
    on PUBLIC."ihaleler" ("satisDurumu");

create index if not exists PUBLIC."ihaleler_tarihAraligi__1_index"
    on PUBLIC."ihaleler" ("tarihAraligi__1");

create index if not exists PUBLIC."ihaleler_tarihAraligi__2_index"
    on PUBLIC."ihaleler" ("tarihAraligi__2");

create index if not exists PUBLIC."messages_aktif_flag_alan_index"
    on PUBLIC."messages" ("aktif_flag_alan");

create index if not exists PUBLIC."messages_created_tarihi_index"
    on PUBLIC."messages" ("created_tarihi");

create index if not exists PUBLIC."messages_gonderen_index"
    on PUBLIC."messages" ("gonderen");

create index if not exists PUBLIC."messages_okundu_flag_index"
    on PUBLIC."messages" ("okundu_flag");

create index if not exists PUBLIC."messages_okundu_tarihi_index"
    on PUBLIC."messages" ("okundu_tarihi");

create index if not exists PUBLIC."messages_type_id_index"
    on PUBLIC."messages" ("type_id");

create index if not exists PUBLIC."messages_type_index"
    on PUBLIC."messages" ("type");

create index if not exists PUBLIC."muhasebe_creator_index"
    on PUBLIC."muhasebe" ("creator");

create index if not exists PUBLIC."muhasebe_dosyaId_index"
    on PUBLIC."muhasebe" ("dosyaId");

create index if not exists PUBLIC."muhasebe_tahsilatAciklama_index"
    on PUBLIC."muhasebe" ("tahsilatAciklama");

create index if not exists PUBLIC."muhasebe_tahsilatTarihi_index"
    on PUBLIC."muhasebe" ("tahsilatTarihi");

create index if not exists PUBLIC."muhasebe_tip_index"
    on PUBLIC."muhasebe" ("tip");

create index if not exists PUBLIC."muhasebe_yatirilanMiktar_index"
    on PUBLIC."muhasebe" ("yatirilanMiktar");

create index if not exists PUBLIC."notlar_created_tarihi_index"
    on PUBLIC."notlar" ("created_tarihi");

create index if not exists PUBLIC."notlar_modified_tarihi_index"
    on PUBLIC."notlar" ("modified_tarihi");

create index if not exists PUBLIC."notlar_notlar_id_index"
    on PUBLIC."notlar" ("notlar_id");

create index if not exists PUBLIC."takvim_olaylar_created_tarihi_index"
    on PUBLIC."takvim_olaylar" ("created_tarihi");

create index if not exists PUBLIC."takvim_olaylar_google_takvim_index"
    on PUBLIC."takvim_olaylar" ("google_takvim");

create index if not exists PUBLIC."takvim_olaylar_kaynakId_index"
    on PUBLIC."takvim_olaylar" ("kaynakId");

create index if not exists PUBLIC."takvim_olaylar_takvim_olaylar_id_index"
    on PUBLIC."takvim_olaylar" ("takvim_olaylar_id");

create index if not exists PUBLIC."takvim_olaylar_type_index"
    on PUBLIC."takvim_olaylar" ("type");

create index if not exists PUBLIC."taraflar_adres_index"
    on PUBLIC."taraflar" ("adres");

create index if not exists PUBLIC."taraflar_dosyaId_tam_index"
    on PUBLIC."taraflar" ("dosyaId_tam");

create index if not exists PUBLIC."taraflar_taraflar_id_index"
    on PUBLIC."taraflar" ("taraflar_id");

create index if not exists PUBLIC."taraflar_tel_no_index"
    on PUBLIC."taraflar" ("tel_no");

create index if not exists PUBLIC."taraflar_vekil_index"
    on PUBLIC."taraflar" ("vekil");

create index if not exists PUBLIC."tebligatlar_created_tarihi_index"
    on PUBLIC."tebligatlar" ("created_tarihi");

create index if not exists PUBLIC."tebligatlar_dosyaId_tam_index"
    on PUBLIC."tebligatlar" ("dosyaId_tam");

create index if not exists PUBLIC."tebligatlar_durum_index"
    on PUBLIC."tebligatlar" ("durum");

create index if not exists PUBLIC."tebligatlar_eTebligat_index"
    on PUBLIC."tebligatlar" ("eTebligat");

create index if not exists PUBLIC."tebligatlar_evrakTarihi_index"
    on PUBLIC."tebligatlar" ("evrakTarihi");

create index if not exists PUBLIC."tebligatlar_gorulmemis_index"
    on PUBLIC."tebligatlar" ("gorulmemis");

create index if not exists PUBLIC."tebligatlar_icerik_index"
    on PUBLIC."tebligatlar" ("icerik");

create index if not exists PUBLIC."tebligatlar_isEdited_index"
    on PUBLIC."tebligatlar" ("isEdited");

create index if not exists PUBLIC."tebligatlar_isLastState_index"
    on PUBLIC."tebligatlar" ("isLastState");

create index if not exists PUBLIC."tebligatlar_lastStateTarihi_index"
    on PUBLIC."tebligatlar" ("lastStateTarihi");

create index if not exists PUBLIC."tebligatlar_muhatap_index"
    on PUBLIC."tebligatlar" ("muhatap");

create index if not exists PUBLIC."tebligatlar_tebligatlar_id_index"
    on PUBLIC."tebligatlar" ("tebligatlar_id");

create table if not exists PUBLIC."versioning"
(
    "version"       DOUBLE PRECISION default 1,
    "versioning_id" INTEGER auto_increment
);

alter table PUBLIC."versioning"
    add constraint if not exists CONSTRAINT_D
        primary key ("versioning_id");


create index if not exists PUBLIC."yedekler_created_tarihi_index"
    on PUBLIC."yedekler" ("created_tarihi");

create index if not exists PUBLIC."yedekler_isUploaded_index"
    on PUBLIC."yedekler" ("isUploaded");

create index if not exists PUBLIC."yedekler_upload_id_index"
    on PUBLIC."yedekler" ("upload_id");

create index if not exists PUBLIC."yedekler_uploaded_tarihi_index"
    on PUBLIC."yedekler" ("uploaded_tarihi");

TRUNCATE TABLE PUBLIC."versioning";
INSERT INTO PUBLIC."versioning" ("version") VALUES ( 1.0 );

