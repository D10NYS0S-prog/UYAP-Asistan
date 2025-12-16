var requests = {
    check: []
}
let systemInfo = (new UAParser()).getResult();
let user_dialog = {
    /**
     *
     * @param {object} center center.mesaj innerHTML, center.buttons div elementlerden oluşan arrray.
     * @param {object} inright ikinci sayfa için center
     * @returns {object} div.datareturn değerini döndürür
     */
    show: function (center, inright) {

        return new Promise((resolve, reject) => {
            let radio = document.querySelector("input[name=dialog_state]");
            document.querySelector("input[name=dialog_state]+div .center .mesaj").innerHTML = center.mesaj;
            center.buttons.forEach((value, key) => {
                document.querySelector("input[name=dialog_state]+div .center .dlg-prompt").appendChild(value);
                value.addEventListener('click', async function (elem) {
                    let der;
                    if (value.onfunc != null) {
                        der = await value.onfunc();
                    }
                    if (der != undefined) {
                        resolve(der);
                    }

                });
            });
            if (inright) {
                document.querySelector("input[name=dialog_state]+div .inright .mesaj").innerHTML = inright.mesaj;
                inright.buttons.forEach((value, key) => {
                    document.querySelector("input[name=dialog_state]+div .inright .dlg-prompt").appendChild(value);
                    value.addEventListener('click', async function (elem) {
                        let der;
                        if (value.onfunc != null) {
                            der = await value.onfunc();
                        }
                        if (der != undefined) {
                            resolve(der);
                        }

                    });
                });
            }
            radio.click();

        });

    },
    next: function (params) {
        document.querySelectorAll(".dlg-content.center").forEach(function (params) {
            params.classList.add("inleft");
            params.classList.remove("center");

        })
        document.querySelectorAll(".dlg-content.inright").forEach(function (params) {
            params.classList.remove("inright");
            params.classList.add("center");
        })
    },
    prev: function (params) {
        document.querySelectorAll(".dlg-content.center").forEach(function (params) {
            params.classList.add("inright");
            params.classList.remove("center");

        })
        document.querySelectorAll(".dlg-content.inleft").forEach(function (params) {
            params.classList.remove("inleft");
            params.classList.add("center");
        })
    },
    hide: function (params) {
        let inp = document.querySelector("input[name=dialog_state]:checked");
        if (inp) {
            inp.click();
            document.querySelector("input[name=dialog_state]+div").innerHTML = ` <div class='dlg-wrap'>
                    <div class='dlg-content center'>
                        <div class='mesaj'>

                        </div>
                        <div class='dlg-prompt'>

                        </div>
                    </div>
                    <div class='dlg-content inright'>
                        <div class='mesaj'>

                        </div>
                        <div class='dlg-prompt'>

                        </div>
                    </div>
                </div>
           
                `

        }

    }
};
let blockUILogo = {
    container: document.createElement("div"),
    show: function (genel, ayrinti, son, toblock = "body", arayaGir = false, koru = false) {
        if (arayaGir) {
            this.hide();
            blockUILogo.container.classList.add("UYP_block");
            blockUILogo.container.innerHTML = '<div><div class="lds-dual-ring"><img style="width:55px;align-self:center;" src="chrome-extension://hlgcdafdokigonljodongahofoeaedjk/style/img/logo.png" /></div><span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_genel" data-koru="' + koru.toString() + '">' + genel + '</span><div><span id="dialog_ayrinti" style="margin-top: 5px;color: white;">' + ayrinti + '</span><span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_yuzde"></span></div><div><span id="dialog_son" style="color: white;">' + son + '</span><span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_yuzde_son"></span></div><div>';
            document.querySelector(toblock).append(this.container);
        } else if (!this.container.isConnected) {
            blockUILogo.container.classList.add("UYP_block");
            blockUILogo.container.innerHTML = '<div><div class="lds-dual-ring"><img style="width:55px;align-self:center;" src="chrome-extension://hlgcdafdokigonljodongahofoeaedjk/style/img/logo.png" /></div><span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_genel" data-koru="' + koru.toString() + '">' + genel + '</span><div><span id="dialog_ayrinti" style="margin-top: 5px;color: white;">' + ayrinti + '</span><span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_yuzde"></span></div><div><span id="dialog_son" style="color: white;">' + son + '</span><span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_yuzde_son"></span></div><div>';
            document.querySelector(toblock).append(this.container);
        }

    },
    hide: function () {

        this.container.remove();

    }
};


addEventListener("message", async (event) => {
    //VERSION if (event.origin !== location.protocol+"//avukat.uyap.gov.tr") return;
    try {
        if (event.data.ask == 'startup') {

                await loadExtension();

            event.ports[0].postMessage({result: true});
        }
        if (event.data.ask == '_cSa') {

        }
        if (event.data.ask == 'askAyarlar') {
        }
        if (event.data.ask == 'google_yetki_ver') {
        }
        if (event.data.ask == 'locationReload') {

        }
        if (event.data.ask == 'disableExtension') {
        }
        if (event.data.ask == 'downloadFile') {

            let response = await chrome.runtime.sendMessage({
                ask: "downloadfile",
                fileDownload: event.data.params
            });
            if (response) {
                if (response.id > 0) {
                    window.URL.revokeObjectURL(event.data.params.url);
                    event.ports[0].postMessage({
                        result: true,
                        downloadedFile: Object.assign(event.data.params, response)
                    });
                }
            }

        }
        if (event.data.ask == 'tabligatlarToCheck') {
        }

    } catch (e) {
        event.ports[0].postMessage({error: e});
    }
}, false)
function loadExtension() {

    return new Promise(async (resolve, reject) => {

        var injectedScripts = [
            {
                src: "/lib/jquery/jquery.min.js",
                type: "text/javascript"
            },
            {
                src: "/lib/ua-parser-js/ua-parser.min.js",
                type: "text/javascript"
            },
            {
                src: "/lib/xhook/xhook.js",
                type: "text/javascript"
            },
            {
                src: "/lib/pdfjs/pdf.min.mjs",
                type: "module"
            },
            {
                src: "/lib/pdfmake/pdfmake.min.js",
                type: "text/javascript"
            },
            {
                src: "/lib/jodit/jodit.min.js",
                type: "text/javascript"
            },
            {
                src: "/lib/glightbox/glightbox.min.js",
                type: "text/javascript"
            },
            {
                src: "/lib/sumoselect/jquery.sumoselect.min.js",
                type: "text/javascript"
            },
            {
                src: "/lib/pdf-barcode/quagga.min.js",
                type: "text/javascript"
            },
            {
                src: "/lib/pdf-barcode/pdf-barcode.min.js",
                type: "text/javascript"
            },
            {
                src: "/lib/datatables/jquery.dataTables.min.js",
                type: "text/javascript"
            },
            {
                src: "/lib/pnotify/core/PNotify.js",
                type: "text/javascript"
            },
            {
                src: "/lib/pnotify/animate/PNotifyAnimate.js",
                type: "text/javascript"
            },
            /*
            {
                src: "/bilirkisi/lib/google/google.js",
                type: "text/javascript"
            },
             */

            {
                src: "/bilirkisi/portal/main.js",
                type: "text/javascript"
            },

            {
                src: "/lib/lightgallery/js/lightgallery.umd.js",
                type: "text/javascript"
            },
            {
                src: "/lib/lightgallery/js/lg-thumbnail.umd.js",
                type: "text/javascript"
            },
            {
                src: "/lib/lightgallery/js/lg-zoom.umd.js",
                type: "text/javascript"
            },
{
                src: "/lib/lightgallery/js/lg-fullscreen.umd.js",
                type: "text/javascript"
            },
{
                src: "/lib/lightgallery/js/lg-rotate.umd.js",
                type: "text/javascript"
            },

            {
                src: "/lib/UTIFJS/UTIF.js",
                type: "text/javascript"
            }
        ];
        let _hata = 0;
        for (let index = 0; index < injectedScripts.length; index++) {
            await new Promise((resolve1, reject1) => {
                let sc = document.createElement('script');
                sc.onload = function () {
                    this.remove();
                    resolve1(true);
                };
                sc.onerror = function (e) {
                    if (_hata < 8) {
                        index--;
                        _hata++
                    } else {
                        window.location.reload();
                    }
                };

                sc.src = chrome.runtime.getURL(injectedScripts[index].src);
                sc.type = injectedScripts[index].type;
                (document.body || document.documentElement).appendChild(sc);
            })
        }
        resolve(true);

    })
}

let dialog = document.createElement("div");
dialog.innerHTML = `<input type="checkbox" name="dialog_state" class="dialog_state" onchange="UYAP_EXT.DIALOG.user_dialog.onchange(this,false)">
            <div class="dialog" id="user_dialog_wrapper">
                <div class='dlg-wrap'>
                    <div class='dlg-content center'>
            <div class='mesaj'>
            
            </div>
                        <div class='dlg-prompt'>
                            
                        </div>
                    </div>
                    <div class='dlg-content inright'>
                    <div class='mesaj'>
            
                    </div>
                        <div class='dlg-prompt'>
                            
                        </div>
                    </div>
                </div>
                </div>
                
    
                `
document.body.appendChild(dialog);
document.body.insertAdjacentHTML("afterbegin",`
                <div  id="tebligatNotify" style="display: none"><input type="checkbox" id="tebligatNotifyCheck">
    <label for="tebligatNotifyCheck">
      <i class="fas fa-envelope animate__animated animate__headShake animate__infinite animate__slow animate__repeat-3"  id="notifyleft"></i>
      <i class="fas fa-chevron-circle-right" id="notifyright"></i>
    </label>
    <div id="tebligat_sidebar" ></div></div>`);

var startUpScripts = [
    "/bilirkisi/portal/startup.js"
];
new Promise(async (resolve, reject) => {
    let _hata = 0;
    for (let index = 0; index < startUpScripts.length; index++) {
        await new Promise((resolve1, reject1) => {
            let sc = document.createElement('script');
            sc.onload = function () {
                this.remove();
                resolve1(true);
            };
            sc.onerror = function (e) {
                if (_hata < 8) {
                    index--;
                    _hata++
                } else {
                    window.location.reload();
                }
            };
            sc.src = chrome.runtime.getURL(startUpScripts[index]);
            (document.head || document.documentElement).appendChild(sc);
        })
    }
    resolve(true);
})
