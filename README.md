# UYAP Asistan - Desktop Application

UYAP Asistan, İMEREK Chrome eklentisinden dönüştürülmüş bir masaüstü uygulamasıdır. Türkiye'nin Ulusal Yargı Ağı Projesi (UYAP) için avukatların işlerini kolaylaştıran bir yardımcı araçtır.

## Özellikler

- Avukat Portalı (avukatbeta.uyap.gov.tr) desteği
- Bilirkişi Portalı (bilirkisi.uyap.gov.tr) desteği
- Vatandaş Portalı (vatandas.uyap.gov.tr) desteği
- Otomatik içerik enjeksiyonu
- Chrome API'lerinin Electron'a uyumlu hale getirilmesi

## Kurulum

### Gereksinimler
- Node.js (v16 veya üstü)
- npm veya yarn

### Bağımlılıkları yükleme

```bash
npm install
```

## Kullanım

### Geliştirme modunda çalıştırma

```bash
npm run dev
```

### Production modunda çalıştırma

```bash
npm start
```

### Uygulama paketi oluşturma

Windows için:
```bash
npm run build:win
```

macOS için:
```bash
npm run build:mac
```

Linux için:
```bash
npm run build:linux
```

## Proje Yapısı

```
UYAP-Asistan/
├── src/
│   ├── main/
│   │   ├── main.js          # Ana Electron process
│   │   ├── injector.js      # İçerik enjeksiyon mantığı
│   │   └── preload.js       # Güvenli IPC köprüsü
│   ├── extension/
│   │   ├── portal/          # Avukat portalı dosyaları
│   │   ├── bilirkisi/       # Bilirkişi portalı dosyaları
│   │   ├── vatandas/        # Vatandaş portalı dosyaları
│   │   ├── popup/           # Popup UI dosyaları
│   │   ├── lib/             # Üçüncü taraf kütüphaneler
│   │   ├── style/           # Stil ve görsel dosyalar
│   │   ├── manifest.json    # Orijinal Chrome extension manifest
│   │   └── background.js    # Orijinal Chrome extension background script
│   └── renderer/            # Renderer process dosyaları (gelecek)
├── IMEREK/                  # IMEREK Chrome eklentisi kaynak dosyaları
├── package.json
└── README.md
```

## Kütüphaneler

Tüm gerekli kütüphaneler ve stil dosyaları `src/extension/lib/` ve `src/extension/style/` klasörlerine eklenmiştir:

### lib/ klasörü altında:
- ✓ `lib/jquery/jquery.min.js`
- ✓ `lib/ua-parser-js/ua-parser.min.js`
- ✓ `lib/xhook/xhook.js`
- ✓ `lib/pdfjs/pdf.min.mjs` (ve pdf.worker.min.mjs)
- ✓ `lib/pdfmake/pdfmake.min.js` (ve vfs_fonts.js)
- ✓ `lib/jodit/` - Jodit editör
- ✓ `lib/glightbox/` - GLightbox
- ✓ `lib/sumoselect/` - SumoSelect
- ✓ `lib/datatables/` - DataTables
- ✓ `lib/pnotify/` - PNotify
- ✓ `lib/animatecss/` - Animate.css
- ✓ `lib/lightgallery/` - LightGallery
- ✓ `lib/jsstore/` - JSStore
- ✓ `lib/jszip/` - JSZip
- ✓ `lib/pdf-barcode/` - PDF Barcode
- ✓ `lib/font-awesome/` - Font Awesome
- ✓ `lib/hc-offcanvas-nav/` - HC Off-canvas Nav

### style/ klasörü altında:
- ✓ `style/img/` - Görseller ve ikonlar

## Yapılacaklar

- [x] Temel Electron yapısı oluşturuldu
- [x] İçerik enjeksiyon sistemi oluşturuldu
- [x] Ana pencere ve portal yükleme
- [x] Kütüphanelerin eklenmesi
- [x] Kütüphane enjeksiyonlarının aktifleştirilmesi
- [ ] PDF.js ES modül yükleme düzeltilmesi
- [ ] Popup UI'ının Electron'a adaptasyonu
- [ ] Chrome API'lerinin tam uyumlu hale getirilmesi
  - [ ] `chrome.storage.local` → `electron-store`
  - [ ] `chrome.runtime.sendMessage` → IPC
  - [ ] `chrome.identity` → OAuth implementasyonu
- [ ] Asset yollarının düzeltilmesi (chrome-extension:// → yerel yol)
- [ ] Google OAuth PKCE implementasyonu
- [ ] Bilirkişi portalı için portal.js dosyasının eklenmesi

## Bilinen Sorunlar

1. **PDF.js modül hatası**: `pdf.min.mjs` bir ES modülüdür ve `executeJavaScript` ile yüklenemeyebilir - özel bir yükleme mekanizması gerekiyor
2. **Chrome extension yolları**: Kodda `chrome-extension://...` yolları mevcut, bunların yerel yollara dönüştürülmesi gerekiyor
3. **Bilirkişi portalı**: `bilirkisi/portal.js` dosyası yüklenmiş dosyalar arasında yok

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen bir pull request göndermeden önce değişikliklerinizi test edin.

## Lisans

ISC

## İletişim

Geliştirici: D10NYS0S-prog
Email: a.hkn97@gmail.com
