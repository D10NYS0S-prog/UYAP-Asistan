# Quick Start Guide

Bu rehber, UYAP Asistan uygulamasını ilk kez çalıştırmak için gereken adımları açıklar.

## Ön Koşullar

1. **Node.js Kurulumu**
   - Node.js v16 veya üstü gereklidir
   - [nodejs.org](https://nodejs.org/) adresinden indirin
   - Kurulumu kontrol edin:
     ```bash
     node --version
     npm --version
     ```

2. **Kütüphanelerin Eklenmesi**
   - `LIBRARY_SETUP.md` dosyasındaki talimatları izleyin
   - Kütüphaneler `src/extension/lib/` klasörüne eklenmelidir
   - Asset dosyaları `src/extension/style/` klasörüne eklenmelidir

## Adım 1: Bağımlılıkları Yükleme

```bash
cd /path/to/UYAP-Asistan
npm install
```

Bu komut, `package.json` dosyasında belirtilen tüm bağımlılıkları yükler:
- Electron
- electron-builder
- electron-store

## Adım 2: Kütüphaneleri Aktifleştirme

Kütüphaneleri ekledikten sonra, `src/main/injector.js` dosyasındaki yorum satırlarını kaldırın:

```javascript
// Önceki hali:
// await loadJS(win.webContents, 'lib/jquery/jquery.min.js');

// Yeni hali:
await loadJS(win.webContents, 'lib/jquery/jquery.min.js');
```

Tüm yorum satırlarını kaldırın:
- lib/jquery/jquery.min.js
- lib/ua-parser-js/ua-parser.min.js
- lib/xhook/xhook.js
- lib/pdfjs/pdf.min.mjs
- lib/pdfmake/pdfmake.min.js
- bilirkisi/main.css
- bilirkisi/portal.js

## Adım 3: Uygulamayı Çalıştırma

### Geliştirme Modunda

```bash
npm run dev
```

Bu komut uygulamayı geliştirme modunda başlatır:
- Developer Tools otomatik açılır
- Console logları görülebilir
- Hataları debug edebilirsiniz

### Production Modunda

```bash
npm start
```

Bu komut uygulamayı normal modda başlatır.

## Adım 4: İlk Test

1. Uygulama başladığında UYAP Avukat Portalı (`https://avukatbeta.uyap.gov.tr`) otomatik açılmalıdır

2. Developer Console'u kontrol edin (Geliştirme modundaysanız):
   - "Injecting scripts for avukatbeta portal..." mesajını görmelisiniz
   - "Scripts injected successfully for avukatbeta" mesajını görmelisiniz
   - Hata varsa console'da görünecektir

3. UYAP'a giriş yapın ve extension özelliklerinin çalışıp çalışmadığını kontrol edin

## Adım 5: Diğer Portalları Test Etme

### Bilirkişi Portalı
```javascript
// Developer Console'da:
window.location.href = 'https://bilirkisi.uyap.gov.tr/enabled';
```

### Vatandaş Portalı
```javascript
// Developer Console'da:
window.location.href = 'https://vatandas.uyap.gov.tr/main/jsp/vatandas/index.jsp';
```

## Yaygın Sorunlar ve Çözümler

### Sorun 1: "Cannot find module" hatası
**Çözüm**: `npm install` komutunu tekrar çalıştırın

### Sorun 2: Scriptler enjekte edilmiyor
**Çözüm**: 
- Kütüphanelerin doğru konumda olduğunu kontrol edin
- `injector.js` dosyasındaki yorum satırlarını kaldırdığınızdan emin olun
- Console'da hata mesajları olup olmadığını kontrol edin

### Sorun 3: "Failed to load resource" hatası
**Çözüm**:
- Dosya yollarının doğru olduğunu kontrol edin
- Eksik kütüphane dosyalarını ekleyin
- `LIBRARY_SETUP.md` dosyasındaki listeyi kontrol edin

### Sorun 4: PDF.js yüklenmiyor
**Çözüm**:
PDF.js bir ES modülüdür ve özel işlem gerektirebilir. İki seçenek:
1. CDN'den yükleyin (DOM'a script tag enjekte ederek)
2. PDF.js'i bundle edin

Örnek DOM enjeksiyonu:
```javascript
const script = document.createElement('script');
script.type = 'module';
script.src = 'chrome-extension://[path]/lib/pdfjs/pdf.min.mjs';
document.head.appendChild(script);
```

### Sorun 5: Chrome extension yolları (chrome-extension://)
**Çözüm**:
Bazı dosyalarda `chrome-extension://hlgcdafdokigonljodongahofoeaedjk/...` gibi yollar olabilir.
Bunları yerel yollara dönüştürmeniz gerekebilir. Örneğin:
- `main.js` dosyasında bu yollar varsa, bunları Electron'un resource path'i ile değiştirin
- Veya preload script'te bir fonksiyon ekleyerek bu yolları otomatik dönüştürün

## Uygulama Paketleme

Test tamamlandıktan sonra, uygulamayı paketlemek için:

### Windows
```bash
npm run build:win
```

### macOS
```bash
npm run build:mac
```

### Linux
```bash
npm run build:linux
```

Paketlenmiş uygulama `dist/` klasöründe oluşturulacaktır.

## Debug İpuçları

### Console Logları
Developer Tools'da şu mesajları görebilmelisiniz:
- "Injecting scripts for [portal] portal..."
- "Scripts injected successfully for [portal]"
- Hata varsa: "Inject error: [error details]"

### Network İzleme
Developer Tools > Network sekmesinde:
- Script ve CSS dosyalarının yüklendiğini kontrol edin
- 404 hataları varsa, dosya yollarını kontrol edin

### IPC İzleme
Main process console'da (terminal):
- IPC handler çağrılarını görebilirsiniz
- Hataları görebilirsiniz

## Daha Fazla Yardım

- README.md: Genel proje bilgileri
- LIBRARY_SETUP.md: Kütüphane kurulum rehberi
- SECURITY.md: Güvenlik notları
- GitHub Issues: Sorun bildirme

## İletişim

Sorularınız için: a.hkn97@gmail.com
