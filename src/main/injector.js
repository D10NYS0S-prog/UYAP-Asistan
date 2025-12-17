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
        
        // JS (order matters) - Load ALL required libraries
        await loadJS(win.webContents, 'lib/jquery/jquery.min.js');
        await loadJS(win.webContents, 'lib/ua-parser-js/ua-parser.min.js');
        await loadJS(win.webContents, 'lib/xhook/xhook.js');
        await loadJS(win.webContents, 'lib/glightbox/glightbox.min.js');
        await loadJS(win.webContents, 'lib/pdfmake/pdfmake.min.js');
        await loadJS(win.webContents, 'lib/pdfmake/vfs_fonts.js');
        await loadJS(win.webContents, 'lib/jodit/jodit.min.js');
        await loadJS(win.webContents, 'lib/sumoselect/jquery.sumoselect.min.js');
        await loadJS(win.webContents, 'lib/pdf-barcode/quagga.min.js');
        await loadJS(win.webContents, 'lib/pdf-barcode/pdf-barcode.min.js');
        await loadJS(win.webContents, 'lib/datatables/datatables.min.js');
        await loadJS(win.webContents, 'lib/pnotify/core/PNotify.js');
        await loadJS(win.webContents, 'lib/pnotify/animate/PNotifyAnimate.js');
        await loadJS(win.webContents, 'lib/lightgallery/js/lightgallery.umd.js');
        await loadJS(win.webContents, 'lib/lightgallery/js/lg-thumbnail.umd.js');
        await loadJS(win.webContents, 'lib/lightgallery/js/lg-zoom.umd.js');
        await loadJS(win.webContents, 'lib/lightgallery/js/lg-fullscreen.umd.js');
        await loadJS(win.webContents, 'lib/lightgallery/js/lg-rotate.umd.js');
        await loadJS(win.webContents, 'lib/jsstore/jsstore.min.js');
        await loadJS(win.webContents, 'lib/jszip/jszip.min.js');
        // Note: lib/pdfjs/pdf.min.mjs is an ES module and needs special handling
        await loadJS(win.webContents, 'portal/startup.js');
        
        // Load inject.js which contains all the IMEREK features
        await loadJS(win.webContents, 'portal/inject.js');
        
        // Load main.css for İMEREK UI styles
        await loadCSS(win.webContents, 'portal/main.css');
        
        // Load main.js and portal.js for additional functionality  
        await loadJS(win.webContents, 'portal/main.js');
        await loadJS(win.webContents, 'portal/portal.js');
        
        // Load popup injector to add İMEREK sidebar
        try {
          await loadJS(win.webContents, 'portal/popup-injector.js');
          console.log('popup-injector.js loaded successfully');
        } catch (error) {
          console.error('Error loading popup-injector.js:', error);
        }
        
        console.log('Scripts injected successfully for avukatbeta');
        
        // Add debugging to check if UYAP_EXT is loaded
        setTimeout(async () => {
          const hasUyapExt = await win.webContents.executeJavaScript('typeof UYAP_EXT !== "undefined"');
          console.log('UYAP_EXT loaded:', hasUyapExt);
          if (hasUyapExt) {
            const hasButtons = await win.webContents.executeJavaScript('typeof UYAP_EXT.TOOL !== "undefined" && typeof UYAP_EXT.TOOL.imerekButtons !== "undefined"');
            console.log('IMEREK buttons available:', hasButtons);
            const hasDialogs = await win.webContents.executeJavaScript('Object.keys(UYAP_EXT.DIALOG || {})');
            console.log('Available DIALOG methods:', hasDialogs);
          }
        }, 2000);
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
