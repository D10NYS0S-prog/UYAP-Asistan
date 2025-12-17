// Popup Injector - Injects İMEREK popup as a sidebar into UYAP portal pages
(function() {
    'use strict';
    
    // Immediate execution - inject as soon as possible
    function injectPopup() {
        // Check if popup already injected
        if (document.getElementById('imerek-popup-sidebar')) {
            return;
        }
        
        if (!document.body) {
            setTimeout(injectPopup, 50);
            return;
        }
    
    // Create popup HTML structure
    const popupHTML = `
        <div id="imerek-popup-sidebar" class="imerek-popup-sidebar">
            <div class="imerek-popup-toggle" id="imerek-popup-toggle">
                <span>İ</span>
            </div>
            <div class="imerek-popup-content" id="imerek-popup-content">
                <div class="imerek-popup-header">
                    <h3>İMEREK UYAP YARDIMCISI</h3>
                    <button class="imerek-popup-close" id="imerek-popup-close">×</button>
                </div>
                <div class="imerek-popup-body">
                    <table class="table" id="imerek-user-table" style="display: none; width: 100%;">
                        <thead>
                            <tr>
                                <th colspan="2">AKTİF KULLANICI</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Üye ID</td>
                                <td class="uyeid"></td>
                            </tr>
                            <tr>
                                <td>Ad Soyad</td>
                                <td class="adsoyad"></td>
                            </tr>
                            <tr>
                                <td>Üyelik Türü</td>
                                <td class="uyeturu"></td>
                            </tr>
                            <tr>
                                <td>Kullanım Bitiş Tarihi</td>
                                <td class="sonkullanim"></td>
                            </tr>
                            <tr>
                                <td>Derdest Dosya</td>
                                <td class="_csa"></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2">
                                    <div class="playpause" id="imerek-playpause">
                                        <div class="fondo"></div>
                                        <div class="icono">
                                            <div class="parte izquierda"></div>
                                            <div class="parte derecha"></div>
                                        </div>
                                        <div class="puntero"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="sistemdurumu"></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div id="nonAktifOturum" style="display: none; text-align: center; padding: 20px;">
                        <p>UYAP Avukat Portala Giriş Yapmalısınız</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Inject popup HTML
    const popupContainer = document.createElement('div');
    popupContainer.innerHTML = popupHTML;
    document.body.appendChild(popupContainer.firstElementChild);
    
    // Inject popup CSS
    const popupCSS = `
        #imerek-popup-sidebar {
            position: fixed;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            z-index: 999999;
            font-family: Arial, sans-serif;
        }
        
        .imerek-popup-toggle {
            position: absolute;
            right: 0;
            top: 0;
            width: 40px;
            height: 40px;
            background: #2196F3;
            color: white;
            border-radius: 5px 0 0 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            box-shadow: -2px 2px 10px rgba(0,0,0,0.3);
            transition: all 0.3s;
        }
        
        .imerek-popup-toggle:hover {
            background: #1976D2;
            width: 45px;
        }
        
        .imerek-popup-content {
            position: absolute;
            right: -350px;
            top: 0;
            width: 350px;
            max-height: 80vh;
            background: white;
            border-radius: 5px 0 0 5px;
            box-shadow: -5px 0 20px rgba(0,0,0,0.3);
            transition: right 0.3s ease;
            overflow-y: auto;
        }
        
        #imerek-popup-sidebar.open .imerek-popup-content {
            right: 0;
        }
        
        .imerek-popup-header {
            background: #2196F3;
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .imerek-popup-header h3 {
            margin: 0;
            font-size: 14px;
            font-weight: bold;
        }
        
        .imerek-popup-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            line-height: 24px;
        }
        
        .imerek-popup-close:hover {
            background: rgba(255,255,255,0.2);
            border-radius: 3px;
        }
        
        .imerek-popup-body {
            padding: 15px;
        }
        
        #imerek-user-table {
            border-collapse: collapse;
        }
        
        #imerek-user-table th {
            background: #2196F3;
            color: white;
            padding: 10px;
            text-align: center;
        }
        
        #imerek-user-table td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
        
        #imerek-user-table td:first-child {
            font-weight: bold;
            width: 45%;
        }
        
        .playpause {
            width: 60px;
            height: 60px;
            margin: 10px auto;
            position: relative;
            cursor: pointer;
        }
        
        .playpause .fondo {
            width: 100%;
            height: 100%;
            background: #ddd;
            border-radius: 50%;
        }
        
        .playpause .icono {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
        }
        
        .playpause .parte {
            position: absolute;
            width: 12px;
            height: 100%;
            background: #666;
            transition: all 0.3s;
        }
        
        .playpause .izquierda {
            left: 0;
        }
        
        .playpause .derecha {
            right: 0;
        }
        
        .playpause.active .fondo {
            background: #4CAF50;
        }
        
        .playpause.active .parte {
            background: white;
        }
        
        .playpause.active .izquierda {
            transform: rotate(-30deg) translateX(-5px);
        }
        
        .playpause.active .derecha {
            transform: rotate(30deg) translateX(5px);
        }
        
        .sistemdurumu {
            text-align: center;
            font-weight: bold;
            padding: 10px !important;
        }
        
        #nonAktifOturum {
            color: #666;
        }
        
        #nonAktifOturum p {
            margin: 0;
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = popupCSS;
    document.head.appendChild(styleElement);
    
    // Popup functionality
    const sidebar = document.getElementById('imerek-popup-sidebar');
    const toggle = document.getElementById('imerek-popup-toggle');
    const closeBtn = document.getElementById('imerek-popup-close');
    const content = document.getElementById('imerek-popup-content');
    
    // Toggle sidebar
    toggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        if (sidebar.classList.contains('open')) {
            loadPopupData();
        }
    });
    
    // Close sidebar
    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('open');
    });
    
    // Load popup data
    function loadPopupData() {
        if (!window.chrome || !window.chrome.storage) {
            console.error('Chrome storage not available');
            document.getElementById('nonAktifOturum').style.display = 'block';
            return;
        }
        
        chrome.storage.local.get(null, (res) => {
            const mainTabs = res.tabs ? res.tabs.main : [];
            if (mainTabs.length > 0 && res.active_user && res[res.active_user]) {
                chrome.runtime.sendMessage({
                    ask: "uyelik",
                    params: {
                        avukat_id: res.active_user,
                        unique_id: res[res.active_user].response ? res[res.active_user].response.uyap_unique_id : null
                    },
                }, function (response) {
                    if (response && response.kullanimHakki) {
                        const user = res[res.active_user];
                        res[res.active_user].response = response.kullanimHakki;
                        
                        document.querySelector(".uyeid").innerText = response.kullanimHakki.imerek_avukat_id;
                        document.querySelector(".adsoyad").innerText = user.avukat_adi + " " + user.avukat_soyadi;
                        document.querySelector(".uyeturu").innerText = response.kullanimHakki.uyap_type.indexOf("ucretli") >= 0 ? "Ücretli" : response.kullanimHakki.uyap_type.indexOf("ucretsiz") >= 0 ? "Ücretsiz" : "Ödeme Bekleniyor";
                        document.querySelector("._csa").innerText = response.cSa;
                        document.querySelector(".sistemdurumu").innerText = user.options.extensionStatus ? "Uyap Avukat Yardımcınız ÇALIŞIYOR" : "Uyap Avukat Yardımcınız DURAKLATILDI!";
                        
                        const playpause = document.getElementById('imerek-playpause');
                        if (user.options.extensionStatus) {
                            playpause.classList.add("active");
                            document.querySelector(".sistemdurumu").style.color = "green";
                        } else {
                            playpause.classList.remove("active");
                            document.querySelector(".sistemdurumu").style.color = "red";
                        }
                        
                        const fr = response.kullanimHakki.uyap_type === 'ucretli' ? new Date(response.kullanimHakki.uyap_Ucretli_Son.date) : new Date(response.kullanimHakki.uyap_Ucretsiz_Son.date);
                        const sonKullanim = fr.toLocaleDateString("tr-TR");
                        document.querySelector(".sonkullanim").innerText = sonKullanim;
                        
                        document.getElementById('imerek-user-table').style.display = "table";
                        document.getElementById('nonAktifOturum').style.display = "none";
                    } else {
                        document.getElementById('nonAktifOturum').style.display = 'block';
                        document.getElementById('imerek-user-table').style.display = 'none';
                    }
                });
            } else {
                document.getElementById('nonAktifOturum').style.display = 'block';
                document.getElementById('imerek-user-table').style.display = 'none';
            }
        });
    }
    
    // Play/pause toggle functionality
    document.getElementById('imerek-playpause').addEventListener('click', function() {
        chrome.storage.local.get(null, (res) => {
            if (res.active_user && res[res.active_user]) {
                const currentStatus = res[res.active_user].options.extensionStatus;
                res[res.active_user].options.extensionStatus = !currentStatus;
                
                chrome.storage.local.set({
                    [res.active_user]: res[res.active_user]
                }, () => {
                    // Notify background
                    chrome.runtime.sendMessage({
                        ask: "extensionStatus",
                        params: {
                            status: !currentStatus
                        }
                    });
                    
                    // Reload popup data
                    loadPopupData();
                });
            }
        });
    });
    }
    
    // Start injection immediately
    injectPopup();
})();
