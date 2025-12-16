var access_token;
var tabs = {
    main: [],
    view_document: [],
    fileviewer: []
};

chrome.storage.local.set({ "tabs": tabs });
function firstInstall() {
    chrome.tabs.create({
        url: 'https://uyap.imerek.com/downloaded.php'
    });
    newAccessToken();

}

function newAccessToken(callback, errcallback, interactive) {
    chrome.identity.clearAllCachedAuthTokens(function () {
        access_token = null;
        getAccessToken(callback, errcallback, interactive);
    });
}

function getAccessToken(callback, errcallback, interactive = false) {

    if (access_token != null) {
        return access_token;
    } else {
        chrome.identity.getAuthToken({
            interactive: interactive
        }, function (token) {
            if (token != null) {
                access_token = token;
                if (callback != null) {
                    callback(token);
                }
            } else {
                access_token = null;
                if (errcallback != null) {
                    errcallback(chrome.runtime.lastError);
                }

            }
        });
    }


}

chrome.runtime.onInstalled.addListener(function (details) {
    switch (details.reason) {
        case 'install':
            firstInstall();
            break;
        default:
            getAccessToken();

            break;
    }


});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.ask == "access_token") {
            if (access_token != null) {
                sendResponse({ access_token: access_token });
            } else {
                getAccessToken((token) => sendResponse({ access_token: token }), (err) => sendResponse(err), request.interactive)
            }

        }
        if (request.ask == "new_access_token") {
            newAccessToken((token) => sendResponse({ access_token: token }), (err) => sendResponse(err), request.interactive);
        }
        if (request.ask == "showDefaultFolder") {
            chrome.downloads.showDefaultFolder();
        }

        if (request.ask == "check" || request.ask == "uyelik" || request.ask == "kvkkCevabi" || request.ask == "odemeBilgileri") {
            request.params.version = (chrome.runtime.getManifest()).version;
            fetch('https://uyap-extension-requests.imerek.com', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => response.json()).then(function (data) {
                sendResponse(data);
            }).catch(function (error) {
                sendResponse(error)
            });


        }
        
        
        if (request.ask == "tebligatCheck") {

            fetch('https://api.ptt.gov.tr/api/ShipmentTracking', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify([request.params.barkodNo.toString()])
                
            }).then((response) => response.text()).then(function (data) {
                sendResponse(data);
            }).catch(function (error) {
                sendResponse(error);
            });
        }



        if (request.ask == "database") {
            let _response = {}
            fetch(request.url, request.request).then((response) => {
                _response.status = response.status;
                response.text().then(function (data) {
                    _response.body = data;
                    sendResponse(_response);
                })
            }).catch(function (error) {
                sendResponse(error);
            })
        }
        if (request.ask == "tabsAdd") {
            new Promise(async (resolve, reject) => {
                let added = false;
                for (let index = 0; index < tabs[request.class].length; index++) {
                    if (tabs[request.class][index].id == sender.tab.id) {
                        added = true;
                        break;
                    }
                }
                if (!added) {
                    tabs[request.class].push(sender.tab);
                }

                let aktifMainTabs = []
                for (let index = 0; index < tabs.main.length; index++) {
                    try {
                        tabs.main[index] = await chrome.tabs.get(tabs.main[index].id);
                        if (tabs.main[index].url.indexOf("https://avukat.uyap.gov.tr/main/jsp/avukat/index.jsp") >= 0 || tabs.main[index].url.indexOf("avukatbeta.uyap.gov.tr") >= 0 || tabs.main[index].url.indexOf("bilirkisi.uyap.gov.tr") >= 0) {
                            aktifMainTabs.push(tabs.main[index]);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
                tabs.main = aktifMainTabs;
                chrome.storage.local.set({ "tabs": tabs });
                resolve(tabs);
            }).then(frr => {
                sendResponse({ tabs: frr, sender: sender });
            })
        }
        if (request.ask == "extensionStatus") {
            chrome.contextMenus.update(
                'IMEREK_UYAP_YARDIMCISI_DISABLE',
                {
                    checked: !request.status,
                    title: request.status ? "Duraklat" : "Duraklatıldı"
                });
            chrome.contextMenus.update(
                'IMEREK_UYAP_YARDIMCISI_ENABLE',
                {
                    checked: request.status,
                    title: request.status ? "Çalışıyor" : "Çalıştır"
                });
            sendResponse(true);

        }
        if (request.ask == "downloadfile") {
            /*
            function suggest(item,suggest) {
                suggest({filename: request.fileDownload.filename});
            }
            chrome.downloads.onDeterminingFilename.addListener(suggest);
            */
            chrome.downloads.download({
                url: request.fileDownload.url,
                filename: request.fileDownload.filename,
                conflictAction: "overwrite",
                saveAs: request.fileDownload.saveAs ? request.fileDownload.saveAs : false
            }, (downloadId) => {
                let _doDelta = {};
                function onChanged(downloadDelta) {
                    Object.assign(_doDelta, downloadDelta);
                    if (downloadDelta.id === downloadId && downloadDelta.state && downloadDelta.state.current !== 'in_progress') {
                        //chrome.downloads.onDeterminingFilename.removeListener(suggest);
                        chrome.downloads.onChanged.removeListener(onChanged);
                        if (request.fileDownload.deleteDownloaded) {
                            chrome.downloads.removeFile(_doDelta.id);
                        }
                        sendResponse(_doDelta);
                    }
                }
                chrome.downloads.onChanged.addListener(onChanged)

            }
            )


        }

        return true;
    }
);

chrome.contentSettings['automaticDownloads'].set({
    primaryPattern: '*://*.uyap.gov.tr:*/*',
    setting: "allow"
})
chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
        id: 'IMEREK_UYAP_YARDIMCISI',
        documentUrlPatterns: ["*://avukat.uyap.gov.tr/main/jsp/avukat/*", "*://avukatbeta.uyap.gov.tr/*"],
        type: "normal",
        title: "İMEREK UYAP YARDIMCISI"
    });
    chrome.contextMenus.create({
        id: 'IMEREK_UYAP_YARDIMCISI_DISABLE',
        parentId: "IMEREK_UYAP_YARDIMCISI",
        documentUrlPatterns: ["*://avukat.uyap.gov.tr/main/jsp/avukat/*", "*://avukatbeta.uyap.gov.tr/*"],
        type: "checkbox",
        title: "Duraklatıldı"
    });
    chrome.contextMenus.create({
        id: 'IMEREK_UYAP_YARDIMCISI_ENABLE',
        parentId: "IMEREK_UYAP_YARDIMCISI",
        documentUrlPatterns: ["*://avukat.uyap.gov.tr/main/jsp/avukat/*", "*://avukatbeta.uyap.gov.tr/*"],
        type: "checkbox",
        title: "Çalışıyor"
    });
    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === 'IMEREK_UYAP_YARDIMCISI_DISABLE') {
            for (let index = 0; index < tabs.main.length; index++) {
                chrome.tabs.sendMessage(tabs.main[index].id, { ask: "disableExtension" });
            }
            chrome.contextMenus.update(
                'IMEREK_UYAP_YARDIMCISI_DISABLE',
                {
                    checked: true,
                    title: "Duraklatıldı"
                });
            chrome.contextMenus.update(
                'IMEREK_UYAP_YARDIMCISI_ENABLE',
                {
                    checked: false,
                    title: "Çalıştır"
                });

        }
        if (info.menuItemId === 'IMEREK_UYAP_YARDIMCISI_ENABLE') {
            for (let index = 0; index < tabs.main.length; index++) {
                chrome.tabs.sendMessage(tabs.main[index].id, { ask: "enableExtension" });
            }
            chrome.contextMenus.update(
                'IMEREK_UYAP_YARDIMCISI_DISABLE',
                {
                    checked: false,
                    title: "Duraklat"
                });
            chrome.contextMenus.update(
                'IMEREK_UYAP_YARDIMCISI_ENABLE',
                {
                    checked: true,
                    title: "Çalışıyor"
                });
        }
    })
});

chrome.identity.onSignInChanged.addListener(
    () => {
        newAccessToken();
    }
);
chrome.storage.onChanged.addListener((changes, area) => {
    for (const [key, value] of Object.entries(changes)) {
        if (key == "userKeyIds") {
            let url = "https://uyap.imerek.com/uninstalled.php?";
            let params = new URLSearchParams();
            params.append("version", (chrome.runtime.getManifest()).version);
            params.append("ask", "uninstall");
            for (let index = 0; index < value.newValue.length; index++) {
                params.append(index, value.newValue[index]);
            }
            chrome.runtime.setUninstallURL(url.toString() + params.toString())
        }
    }

});
