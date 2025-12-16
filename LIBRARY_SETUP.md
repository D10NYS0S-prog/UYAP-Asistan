# Kütüphane Kurulum Rehberi

Bu dosya, UYAP Asistan uygulaması için gerekli kütüphanelerin nasıl kurulacağını açıklar.

## Gerekli Kütüphaneler

### Yöntem 1: Orijinal Chrome Eklentisinden Kopyalama (ÖNERİLEN)

1. Chrome'da İMEREK eklentisi yüklü ise:
   - Chrome'da `chrome://extensions/` adresine gidin
   - "Geliştirici modu"nu açın
   - İMEREK eklentisinin ID'sini bulun (hlgcdafdokigonljodongahofoeaedjk)
   - Eklenti dizinine gidin:
     - Windows: `C:\Users\[USERNAME]\AppData\Local\Google\Chrome\User Data\Default\Extensions\hlgcdafdokigonljodongahofoeaedjk\`
     - macOS: `~/Library/Application Support/Google/Chrome/Default/Extensions/hlgcdafdokigonljodongahofoeaedjk/`
     - Linux: `~/.config/google-chrome/Default/Extensions/hlgcdafdokigonljodongahofoeaedjk/`
   
2. `lib/` ve `style/` klasörlerini kopyalayın:
   ```bash
   # Eklenti dizininden
   cp -r lib/ /path/to/UYAP-Asistan/src/extension/lib/
   cp -r style/ /path/to/UYAP-Asistan/src/extension/style/
   ```

### Yöntem 2: CDN/NPM'den Manuel İndirme

Eğer eklenti dosyalarına erişiminiz yoksa, kütüphaneleri tek tek indirmeniz gerekecek:

#### jQuery
```bash
mkdir -p src/extension/lib/jquery
curl -o src/extension/lib/jquery/jquery.min.js https://code.jquery.com/jquery-3.6.0.min.js
```

#### UA Parser
```bash
mkdir -p src/extension/lib/ua-parser-js
curl -o src/extension/lib/ua-parser-js/ua-parser.min.js https://cdn.jsdelivr.net/npm/ua-parser-js@1.0.2/dist/ua-parser.min.js
```

#### xhook
```bash
mkdir -p src/extension/lib/xhook
curl -o src/extension/lib/xhook/xhook.js https://unpkg.com/xhook@1.5.5/dist/xhook.min.js
```

#### PDF.js
```bash
mkdir -p src/extension/lib/pdfjs
curl -o src/extension/lib/pdfjs/pdf.min.mjs https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.mjs
curl -o src/extension/lib/pdfjs/pdf.worker.min.mjs https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.mjs
```

#### PDFMake
```bash
mkdir -p src/extension/lib/pdfmake
curl -o src/extension/lib/pdfmake/pdfmake.min.js https://cdn.jsdelivr.net/npm/pdfmake@0.2.7/build/pdfmake.min.js
curl -o src/extension/lib/pdfmake/vfs_fonts.js https://cdn.jsdelivr.net/npm/pdfmake@0.2.7/build/vfs_fonts.js
```

#### Jodit Editor
```bash
mkdir -p src/extension/lib/jodit
curl -o src/extension/lib/jodit/jodit.min.js https://cdn.jsdelivr.net/npm/jodit@3.24.5/build/jodit.min.js
curl -o src/extension/lib/jodit/jodit.min.css https://cdn.jsdelivr.net/npm/jodit@3.24.5/build/jodit.min.css
```

#### GLightbox
```bash
mkdir -p src/extension/lib/glightbox
curl -o src/extension/lib/glightbox/glightbox.min.js https://cdn.jsdelivr.net/npm/glightbox@3.2.0/dist/js/glightbox.min.js
curl -o src/extension/lib/glightbox/glightbox.min.css https://cdn.jsdelivr.net/npm/glightbox@3.2.0/dist/css/glightbox.min.css
```

#### SumoSelect
```bash
mkdir -p src/extension/lib/sumoselect
curl -o src/extension/lib/sumoselect/jquery.sumoselect.min.js https://cdn.jsdelivr.net/npm/sumoselect@3.4.8/jquery.sumoselect.min.js
curl -o src/extension/lib/sumoselect/sumoselect.min.css https://cdn.jsdelivr.net/npm/sumoselect@3.4.8/sumoselect.min.css
```

#### DataTables
```bash
mkdir -p src/extension/lib/datatables
curl -o src/extension/lib/datatables/datatables.min.js https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js
curl -o src/extension/lib/datatables/datatables.min.css https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css
```

#### PNotify
```bash
mkdir -p src/extension/lib/pnotify/core
curl -o src/extension/lib/pnotify/core/PNotify.js https://cdn.jsdelivr.net/npm/pnotify@5.2.0/dist/PNotifyCompat.js
curl -o src/extension/lib/pnotify/core/PNotify.css https://cdn.jsdelivr.net/npm/pnotify@5.2.0/dist/PNotifyBrightTheme.css
```

#### Animate.css
```bash
mkdir -p src/extension/lib/animatecss
curl -o src/extension/lib/animatecss/animate.css https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css
```

#### LightGallery
```bash
mkdir -p src/extension/lib/lightgallery/css
curl -o src/extension/lib/lightgallery/css/lightgallery-bundle.css https://cdn.jsdelivr.net/npm/lightgallery@2.7.1/css/lightgallery-bundle.min.css
curl -o src/extension/lib/lightgallery/lightgallery.min.js https://cdn.jsdelivr.net/npm/lightgallery@2.7.1/lightgallery.min.js
```

#### JSStore
```bash
mkdir -p src/extension/lib/jsstore
curl -o src/extension/lib/jsstore/jsstore.min.js https://cdn.jsdelivr.net/npm/jsstore@4.6.1/dist/jsstore.min.js
```

#### JSZip
```bash
mkdir -p src/extension/lib/jszip
curl -o src/extension/lib/jszip/jszip.min.js https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js
```

#### Font Awesome
```bash
mkdir -p src/extension/lib/font-awesome/webfonts
curl -o src/extension/lib/font-awesome/fontawesome.css https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/fontawesome.min.css
curl -o src/extension/lib/font-awesome/solid.css https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/solid.min.css
# Font dosyalarını da indirmeniz gerekebilir
```

### Yöntem 3: Otomatik Kurulum Scripti

Aşağıdaki script'i oluşturup çalıştırabilirsiniz:

```bash
#!/bin/bash
# setup-libraries.sh

echo "Kütüphaneler indiriliyor..."

# jQuery
mkdir -p src/extension/lib/jquery
curl -sL -o src/extension/lib/jquery/jquery.min.js https://code.jquery.com/jquery-3.6.0.min.js

# UA Parser
mkdir -p src/extension/lib/ua-parser-js
curl -sL -o src/extension/lib/ua-parser-js/ua-parser.min.js https://cdn.jsdelivr.net/npm/ua-parser-js@1.0.2/dist/ua-parser.min.js

# xhook
mkdir -p src/extension/lib/xhook
curl -sL -o src/extension/lib/xhook/xhook.js https://unpkg.com/xhook@1.5.5/dist/xhook.min.js

# PDF.js
mkdir -p src/extension/lib/pdfjs
curl -sL -o src/extension/lib/pdfjs/pdf.min.mjs https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.mjs
curl -sL -o src/extension/lib/pdfjs/pdf.worker.min.mjs https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.mjs

# PDFMake
mkdir -p src/extension/lib/pdfmake
curl -sL -o src/extension/lib/pdfmake/pdfmake.min.js https://cdn.jsdelivr.net/npm/pdfmake@0.2.7/build/pdfmake.min.js
curl -sL -o src/extension/lib/pdfmake/vfs_fonts.js https://cdn.jsdelivr.net/npm/pdfmake@0.2.7/build/vfs_fonts.js

echo "Temel kütüphaneler indirildi. Diğer kütüphaneler için lütfen dokümantasyona bakın."
```

Çalıştırmak için:
```bash
chmod +x setup-libraries.sh
./setup-libraries.sh
```

## Kurulum Sonrası

Kütüphaneleri kurduktan sonra, `src/main/injector.js` dosyasındaki yorum satırlarını kaldırın:

```javascript
// Öncesi (yorum satırı):
// await loadJS(win.webContents, 'lib/jquery/jquery.min.js');

// Sonrası (aktif):
await loadJS(win.webContents, 'lib/jquery/jquery.min.js');
```

## Doğrulama

Kütüphanelerin doğru yüklendiğini kontrol etmek için:

```bash
ls -la src/extension/lib/
```

Tüm klasörlerin ve dosyaların mevcut olduğundan emin olun.

## Notlar

- Bazı kütüphanelerin belirli versiyonları gerekebilir
- Chrome eklentisinden kopyalama en güvenli yöntemdir çünkü eklentinin çalıştığı versiyonları alırsınız
- CDN versiyonları güncel olabilir ancak uyumluluk sorunları yaşayabilirsiniz
