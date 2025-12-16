const fs = require('fs');
const path = require('path');

function loadText(relPath) {
  return fs.promises.readFile(path.join(__dirname, '..', 'extension', relPath), 'utf8');
}

function loadCSS(webContents, relPath) {
  return loadText(relPath).then(css => webContents.insertCSS(css));
}

function loadJS(webContents, relPath) {
  return loadText(relPath).then(js => webContents.executeJavaScript(js));
}

function registerContentInjection(win) {
  win.webContents.on('did-frame-finish-load', async (_e, isMainFrame) => {
    if (!isMainFrame) return;
    
    const url = win.webContents.getURL();
    
    try {
      // Always inject Chrome API shim first on UYAP portals
      if (/uyap\.gov\.tr/.test(url)) {
        await loadJS(win.webContents, 'chrome-api-shim.js');
        console.log('Chrome API shim injected');
      }

      if (/avukatbeta\.uyap\.gov\.tr/.test(url)) {
        console.log('Injecting scripts for avukatbeta portal...');
        
        // CSS - Load all required stylesheets from manifest
        await loadCSS(win.webContents, 'lib/jodit/jodit.min.css');
        await loadCSS(win.webContents, 'lib/glightbox/glightbox.min.css');
        await loadCSS(win.webContents, 'lib/sumoselect/sumoselect.min.css');
        await loadCSS(win.webContents, 'lib/datatables/datatables.min.css');
        await loadCSS(win.webContents, 'lib/pnotify/core/PNotify.css');
        await loadCSS(win.webContents, 'lib/pnotify/core/BrightTheme.css');
        await loadCSS(win.webContents, 'lib/animatecss/animate.css');
        await loadCSS(win.webContents, 'lib/lightgallery/css/lightgallery-bundle.css');
        await loadCSS(win.webContents, 'portal/main.css');
        
        // JS (order matters)
        await loadJS(win.webContents, 'lib/jquery/jquery.min.js');
        await loadJS(win.webContents, 'lib/ua-parser-js/ua-parser.min.js');
        await loadJS(win.webContents, 'lib/xhook/xhook.js');
        await loadJS(win.webContents, 'lib/glightbox/glightbox.min.js');
        // Note: lib/pdfjs/pdf.min.mjs is an ES module and needs special handling
        await loadJS(win.webContents, 'portal/startup.js');
        await loadJS(win.webContents, 'portal/main.js');
        await loadJS(win.webContents, 'portal/portal.js');
        
        console.log('Scripts injected successfully for avukatbeta');
      } else if (/bilirkisi\.uyap\.gov\.tr/.test(url)) {
        console.log('Injecting scripts for bilirkisi portal...');
        
        // CSS
        // await loadCSS(win.webContents, 'bilirkisi/main.css');
        
        // JS
        await loadJS(win.webContents, 'lib/ua-parser-js/ua-parser.min.js');
        // Note: bilirkisi/portal.js not included in uploaded files
        
        console.log('Scripts injected successfully for bilirkisi');
      } else if (/vatandas\.uyap\.gov\.tr/.test(url)) {
        console.log('Injecting scripts for vatandas portal...');
        
        // CSS
        await loadCSS(win.webContents, 'vatandas/vatandas.css');
        
        // JS
        await loadJS(win.webContents, 'lib/ua-parser-js/ua-parser.min.js');
        await loadJS(win.webContents, 'lib/pdfmake/pdfmake.min.js');
        await loadJS(win.webContents, 'vatandas/xhook.js');
        await loadJS(win.webContents, 'vatandas/inject.js');
        await loadJS(win.webContents, 'vatandas/uyap_vatandas.js');
        
        console.log('Scripts injected successfully for vatandas');
      }
    } catch (err) {
      console.error('Inject error:', err);
    }
  });
}

module.exports = { registerContentInjection };
