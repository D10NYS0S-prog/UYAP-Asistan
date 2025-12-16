if (typeof window.UYAP_EXT == "undefined") {
    window.UYAP_EXT = {};
}
UYAP_EXT.DIALOG = {
    blockUILogo: {
        container: document.createElement("div"),
        show: function (genel, ayrinti, son, toblock = "body", arayaGir = false, koru = false, duraklatFunc) {
            if (arayaGir) {
                this.hide();
                UYAP_EXT.DIALOG.blockUILogo.container.classList.add("UYP_block");
                UYAP_EXT.DIALOG.blockUILogo.container.innerHTML = '<div>' +
                    '<div class="lds-dual-ring"><img style="width:55px;align-self:center;" src="chrome-extension://hlgcdafdokigonljodongahofoeaedjk/style/img/logo.png" /></div>' +
                    '<span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_genel" data-koru="' + koru.toString() + '">' + genel + '</span>' +
                    '<div><span id="dialog_ayrinti" style="margin-top: 5px;color: white;">' + ayrinti + '</span><span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_yuzde"></span></div>' +
                    '<div><span id="dialog_son" style="color: white;">' + son + '</span><span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_yuzde_son"></span></div>' +
                    '<div>';
                $(toblock).append($(this.container).css("display", "flex").hide().fadeIn(100));
            } else if (!this.container.isConnected) {
                UYAP_EXT.DIALOG.blockUILogo.container.classList.add("UYP_block");
                UYAP_EXT.DIALOG.blockUILogo.container.innerHTML = '<div>' +
                    '<div class="lds-dual-ring"><img style="width:55px;align-self:center;" src="chrome-extension://hlgcdafdokigonljodongahofoeaedjk/style/img/logo.png" /></div>' +
                    '<span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_genel" data-koru="' + koru.toString() + '">' + genel + '</span>' +
                    '<div><span id="dialog_ayrinti" style="margin-top: 5px;color: white;">' + ayrinti + '</span><span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_yuzde"></span></div>' +
                    '<div><span id="dialog_son" style="color: white;">' + son + '</span><span style="margin-top: 10px;color: white;width:max-content;margin-left:auto;margin-right:auto;" id="dialog_yuzde_son"></span></div>' +
                    '<div>';
                $(toblock).append($(this.container).css("display", "flex").hide().fadeIn(200));
            }
            if (duraklatFunc) {
                let duraklat = document.createElement('a');
                duraklat.id = "duraklat";
                duraklat.innerText = 'DURAKLAT';
                duraklat.onclick = function dsd(event) {
                    duraklatFunc(event);
                };
                if (!document.getElementById("duraklat")) {
                    this.container.firstChild.append(duraklat);
                }

            }


        },
        hide: function () {

            $(this.container).remove();

        }
    },
    user_dialog: {
        hideMenu: true,
        is_open: function () {
            return document.querySelector("input[name=dialog_state]").checked;
        },
        onchange: function (elem) {
            if (!elem.checked) {
                document.querySelectorAll("#hamburger,.page-header,.page-container").forEach(function (userItem) {
                    userItem.style.transition = "";
                    userItem.style.filter = "";

                });


                document.querySelectorAll("input[name=dialog_state]+div .dlg-prompt").forEach(function (param) {
                    while (param.firstChild) {
                        param.firstChild.remove()
                    }
                });
                let fvf = document.querySelectorAll("input[name=dialog_state]+div .dlg-content");
                setTimeout(() => {
                    fvf.item(0).className = "dlg-content center";
                    fvf.item(1).className = "dlg-content inright";
                }, 500);


            } else {

                document.querySelectorAll("#hamburger,.page-header,.page-container").forEach(function (userItem) {
                    userItem.style.transition = "all 0.7s ease-out";
                    userItem.style.filter = "blur(6px)";

                });


            }
        },
        /**
         *
         * @param {object} center center.mesaj innerHTML, center.buttons div elementlerden oluşan arrray.
         * @param {object} inright ikinci sayfa için center
         * @returns {object} div.onfunc return değerini döndürür. Bir değer döndürmek zorunda aksi halde. resolve etmiyor
         */
        show: async function (center, inright, hideMenu = true) {

            return new Promise((resolve, reject) => {
                this.hideMenu = hideMenu;
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
    },
    openEvrakList: {

        modal: null,
        evrakFilter: async function (filter) {
            let evraklar=[];
            for (let index = 0; index < UYAP_EXT.DB.evraklar.length; index++) {
                if(UYAP_EXT.DB.evraklar[index].onayTarihi>=filter.baslangicTarihi && UYAP_EXT.DB.evraklar[index].onayTarihi<=filter.bitisTarihi){
evraklar.push(UYAP_EXT.DB.evraklar[index]);
                }
            }

            return {
                evraklar: evraklar || [],
                dosyaId: filter.dosyaId,
                baslangicTarihi: filter.baslangicTarihi,
                bitisTarihi: filter.bitisTarihi,
            }
        },
        default: async function (evraktable, dosyatable, dosyaId, elem) {

            dosyaId = parseInt(dosyaId);
            this.modal = elem;
            $(this.modal).closest(".modal").modal('hide');
            UYAP_EXT.DIALOG.blockUILogo.show("Evraklarınız Arama İçin Düzenleniyor", "Lütfen İşlem Bitene Kadar Bekleyiniz", "");
            let baslangic = new Date(2000, 0, 2);
            let bitis = new Date();
            var icerik = await UYAP_EXT.DIALOG.openEvrakList.evrakFilter({
                dosyaId: dosyaId,
                baslangicTarihi: baslangic,
                bitisTarihi: bitis

            });
            this.openMygalleryEvrakAra(icerik);
        },
        folderEvraklarListCreateDateOrder: function (icerik) {
            let results = icerik.evraklar;


            function buttonDownload(clickEvent) {
                let _button_Download = document.createElement("button");
                _button_Download.classList.add("btn", "btn-warning", "btn-sm", "pull-right");
                _button_Download.innerHTML = '<i class="fas fa-download" ></i>';
                _button_Download.onclick = clickEvent;
                return _button_Download;
            }


            results.sort((a, b) => {
                if (a.veriTabaniTarihi && b.veriTabaniTarihi) {
                    return b.veriTabaniTarihi.getTime() - a.veriTabaniTarihi.getTime();
                }
                if (a.veriTabaniTarihi && !b.veriTabaniTarihi) {
                    return b.onayTarihi.getTime() - a.veriTabaniTarihi.getTime();
                }
                if (!a.veriTabaniTarihi && b.veriTabaniTarihi) {
                    return b.veriTabaniTarihi.getTime() - a.onayTarihi.getTime();
                }
                return b.onayTarihi.getTime() - a.onayTarihi.getTime();
            });
            let _list = new Map();
            let _mainUl = document.createElement("ul");
            _mainUl.className = "directory-list";
            for (let index = 0; index < results.length; index++) {

                if (!_list.has(results[index].dosyaId)) {
                    _list.set(results[index].dosyaId, new Map([
                        ['dosya', results[index]]
                    ]));
                    if (results[index].anaevrakId == null) {
                        _list.get(results[index].dosyaId).set(results[index].evrakId, {
                            'evrak': results[index],
                            'ekler': []
                        });
                    } else {
                        _list.get(results[index].dosyaId).set(results[index].anaevrakId, {
                            'evrak': results[index],
                            'ekler': [results[index]]
                        });
                    }
                } else {
                    if (results[index].anaevrakId == null) {
                        if (!_list.get(results[index].dosyaId).has(results[index].evrakId)) {
                            _list.get(results[index].dosyaId).set(results[index].evrakId, {
                                'evrak': results[index],
                                'ekler': []
                            });

                        } else {
                            _list.get(results[index].dosyaId).get(results[index].evrakId).evrak = results[index];
                        }
                    } else {
                        if (_list.get(results[index].dosyaId).has(results[index].anaevrakId)) {
                            _list.get(results[index].dosyaId).get(results[index].anaevrakId)['ekler'].push(results[index]);

                        } else {
                            _list.get(results[index].dosyaId).set(results[index].anaevrakId, {
                                'evrak': results[index],
                                'ekler': [results[index]]
                            });
                        }

                    }
                }

            }
            sayacevrak = 0;
            for (const [key, value] of _list.entries()) {


                let _dosyaLi = document.createElement('li');

                _dosyaLi.innerHTML = (dosya_bilgileri.esasNo ? dosya_bilgileri.esasNo + " E. - " : dosya_bilgileri.dosyaNo ? dosya_bilgileri.dosyaNo + " E. - " : "") + dosya_bilgileri.birimAdi + (dosya_bilgileri.dosyaTurAciklama != null ? " ( " + dosya_bilgileri.dosyaTurAciklama + " )" : "");


                let _downloadButton = buttonDownload(async function (event) {

                    var indirReject;
                    let timeoutId = 0;

                    function indir(values, url, filename,) {
                        var params = Application.convertObjectToURLParameters({
                            evrakId: values.evrakId,
                            dosyaId: values.dosyaId,
                            yargiTuru: values.yargiTuru
                        });
                        let result = UYAP_EXT.TOOL.makeRequest(url, params, UYAP_EXT.TOOL.options.requestInterval, "application/download", function (progress) {
                            try {
                                clearTimeout(timeoutId);
                                document.getElementById("dialog_yuzde_son").innerHTML = " ( " + (progress.loaded / (1024 * 1024)).toFixed(2) + "MB )";
                                timeoutId = setTimeout(() => {
                                    result.XHR.abort();
                                }, 30000);
                            } catch (e) {
                                return;
                            }
                        })
                        let indirResult = new Promise(async function (resolve, reject) {
                            indirReject = reject;

                            if (window.downloadFile.isChrome || window.downloadFile.isSafari) {

                                result.promise.then(async saw => {
                                    clearTimeout(timeoutId);
                                    if (saw.success == false) {
                                        resolve(saw);
                                        return;
                                    }
                                    let checkedFileXHR = await UYAP_EXT.TOOL.fileIntegrityCheck(saw.xhr, values);
                                    if (checkedFileXHR.success == false) {
                                        resolve(checkedFileXHR);
                                        return;
                                    }

                                    let uri = window.URL.createObjectURL(checkedFileXHR.xhr.response);
                                    if (checkedFileXHR.success === null) {
                                        resolve({url: uri, filename: filename.normalize(UYAP_EXT.TOOL.systemInformation.fileNameEncoding), success: checkedFileXHR.success});
                                    }

                                    let ext;
                                    try {
                                        ext = checkedFileXHR.xhr.getResponseHeader("content-disposition").match(/\.(.*)$/);
                                        filename = filename + ext[0];
                                        //programatically click the link to trigger the download

                                        resolve({url: uri, filename: filename.normalize(UYAP_EXT.TOOL.systemInformation.fileNameEncoding)});
                                    } catch (error) {
                                        var fileReader = new FileReader();
                                        fileReader.onloadend = function (e) {
                                            var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
                                            var header = '';
                                            for (var i = 0; i < arr.length; i++) {
                                                header += arr[i].toString(16);
                                            }

                                            // Check the file signature against known types
                                            var ext = '';
                                            switch (header) {
                                                case '504b34':
                                                    ext = 'udf'
                                                    break;
                                                case '89504e47':
                                                    ext = 'png';
                                                    break;
                                                case '47494638':
                                                    ext = 'gif';
                                                    break;
                                                case 'ffd8ffe0':
                                                case 'ffd8ffe1':
                                                case 'ffd8ffe2':
                                                    ext = 'jpeg';
                                                    break;
                                                case '25504446':
                                                    ext = 'pdf';
                                                    break;

                                            }
                                            filename = ext == '' ? filename : filename + "." + ext;

                                            resolve({url: uri, filename: filename.normalize(UYAP_EXT.TOOL.systemInformation.fileNameEncoding)});


                                        };
                                        fileReader.readAsArrayBuffer(checkedFileXHR.xhr.response);
                                    }

                                }).catch(lasXHR => {
                                    result.XHR.abort();
                                });

                            } else {
                                // Force file download (whether supported by server).
                                postToURL_target(url, values, 'width=400,height=10,resizable=yes');
                                resolve({success: false});
                            }
                        }).catch(e => {
                            result.reject();
                            throw new Error("rejected");
                        });
                        return indirResult;
                    }

                    function getYargiBirimi(birimAdi) {
                        let yargibirimi = ""//sulh hukuk mahkemesi, asliye ceza mahkemesi...
                        let _decide = birimAdi.split(/ |\./).filter(word => word.length > 0);
                        var _digits = [];
                        for (let index = 0; index < _decide.length; index++) {
                            if (_decide[index] > 0) {
                                _digits.push(index);
                            }
                        }
                        switch (_digits.length) {
                            case 0:
                                if (_decide[0] == "Yargıtay") {
                                    yargibirimi = "YARGITAY DOSYALARI";
                                    break;
                                }
                                if (_decide[0] == "Arabuluculuk") {
                                    yargibirimi = "ARABULUCULUK DOSYALARI";
                                    break;
                                }
                                for (let index = 1; index < _decide.length; index++) {
                                    yargibirimi = yargibirimi + _decide[index] + " ";

                                }
                                if (yargibirimi.indexOf("Ceza") >= 0) {
                                    yargibirimi = "CEZA DOSYALARI/" + yargibirimi;
                                    yargibirimi = yargibirimi.trim().toLocaleUpperCase("tr-TR");
                                    break;
                                }
                                if (yargibirimi.indexOf("İcra Dairesi") >= 0) {
                                    yargibirimi = "İCRA TAKİPLERİ";
                                    yargibirimi = yargibirimi.trim().toLocaleUpperCase("tr-TR");
                                    break;
                                }
                                if (yargibirimi.indexOf("İdare Mahkemesi") >= 0) {
                                    yargibirimi = "İDARİ YARGI DOSYALARI/" + yargibirimi;
                                    yargibirimi = yargibirimi.trim().toLocaleUpperCase("tr-TR");
                                    break;
                                }
                                if (yargibirimi.indexOf("Cumhuriyet Başsavcılığı") >= 0) {
                                    yargibirimi = "CBS SORUŞTURMA DOSYALARI";
                                    yargibirimi = yargibirimi.trim().toLocaleUpperCase("tr-TR");
                                    break;
                                }
                                yargibirimi = "HUKUK DOSYALARI/" + yargibirimi;
                                yargibirimi = yargibirimi.trim().toLocaleUpperCase("tr-TR");
                                break;
                            case 1:
                                if (_digits[0] > 2) {//Bölge Adliye Mahkemesi Ayrımı
                                    for (let index = 1; index < _digits[0]; index++) {
                                        yargibirimi = yargibirimi + _decide[index] + " ";

                                    }
                                    if (birimAdi.indexOf("Ceza") >= 0) {
                                        yargibirimi = "CEZA DOSYALARI/" + yargibirimi;
                                    } else {
                                        yargibirimi = "HUKUK DOSYALARI/" + yargibirimi;
                                    }
                                    yargibirimi = yargibirimi.trim().toLocaleUpperCase("tr-TR");
                                }
                                if (_digits[0] < 3) {//Sıradan 3. Mahkeme gibi
                                    if (_decide[0] == "Danıştay") {
                                        yargibirimi = "DANIŞTAY DOSYALARI";
                                        break;
                                    }
                                    if (_decide[0] == "Yargıtay") {
                                        yargibirimi = "YARGITAY DOSYALARI";
                                        break;
                                    }
                                    if (_decide[0] == _digits[0]) {
                                        yargibirimi = "YARGITAY DOSYALARI";
                                        break;
                                    }

                                    for (let index = _digits[0] + 1; index < _decide.length; index++) {
                                        yargibirimi = yargibirimi + _decide[index] + " ";

                                    }
                                    if (yargibirimi.indexOf("Ceza") >= 0) {
                                        yargibirimi = "CEZA DOSYALARI/" + yargibirimi;
                                        yargibirimi = yargibirimi.trim().toLocaleUpperCase("tr-TR");
                                        break;
                                    }
                                    if (yargibirimi.indexOf("İcra Dairesi") >= 0) {
                                        yargibirimi = "İCRA TAKİPLERİ";
                                        yargibirimi = yargibirimi.trim().toLocaleUpperCase("tr-TR");
                                        break;
                                    }
                                    if (yargibirimi.indexOf("İdare Mahkemesi") >= 0) {
                                        yargibirimi = "İDARİ YARGI DOSYALARI/" + yargibirimi;
                                        yargibirimi = yargibirimi.trim().toLocaleUpperCase("tr-TR");
                                        break;
                                    }

                                    yargibirimi = "HUKUK DOSYALARI/" + yargibirimi;
                                    yargibirimi = yargibirimi.trim().toLocaleUpperCase("tr-TR");

                                }

                                break;

                        }

                        return yargibirimi;
                    }

                    event.stopPropagation();
                    let todownload = Array.from(value).reverse();
                    let downloaded = [];
                    UYAP_EXT.DIALOG.ActiveLightbox.modal.style.display = 'none';

                    let user = UYAP_EXT.TOOL.user;
                    if (user.interrupts.filedownload) {
                        if (Object.hasOwn(user.interrupts.filedownload, value.get("dosya").dosyaId)) {
                            let islemeDevam = "<p>Aynı dosyada tamamlanmamış indirme işleminiz bulunmaktadır.<br><br>İşleminize kaldığı yerden devam etmek ister misiniz?</p>"
                            let tmm = document.createElement('div');
                            tmm.innerText = 'Devam Et';
                            tmm.className = "button positive";
                            tmm.onfunc = async function (params) {
                                UYAP_EXT.DIALOG.user_dialog.hide();
                                return true;
                            }
                            let hyr = document.createElement('div');
                            hyr.innerText = 'Baştan Başla';
                            hyr.className = "button";
                            hyr.onfunc = async function (params) {
                                UYAP_EXT.DIALOG.user_dialog.hide();

                                return false;
                            }
                            let center = {
                                mesaj: islemeDevam,
                                buttons: [hyr, tmm],

                            }
                            if (await UYAP_EXT.DIALOG.user_dialog.show(center)) {
                                downloaded = user.interrupts.filedownload[value.get("dosya").dosyaId].downloaded;
                                todownload = user.interrupts.filedownload[value.get("dosya").dosyaId].todownload;
                            } else {
                                if (Object.keys(user.interrupts.filedownload).length > 1) {
                                    delete user.interrupts.filedownload[value.get("dosya").dosyaId];
                                } else {
                                    delete user.interrupts.filedownload;
                                }
                                UYAP_EXT.TOOL.user = user;
                            }


                        }

                    }

                    UYAP_EXT.DIALOG.blockUILogo.show(dosya_bilgileri.birimAdi + " " + (dosya_bilgileri.esasNo ? dosya_bilgileri.esasNo + " E." : dosya_bilgileri.dosyaNo ? dosya_bilgileri.dosyaNo + " E. " : ""), "Seçtiğiniz Evraklar İndiriliyor", "Lütfen İşlem Bitene Kadar Bekleyiniz", "body", false, true,
                        (elem) => {
                            elem.target.innerText = "SON EVRAKIN İNDİRİLMESİ BEKLENİYOR...";
                            UYAP_EXT.DIALOG.blockUILogo.hide();
                            indirReject();
                        });

                    let hh = 0;
                    if (!user.interrupts.filedownload) {
                        user.interrupts.filedownload = {};
                    }

                    user.interrupts.filedownload[value.get("dosya").dosyaId] = {
                        downloaded: downloaded,
                        todownload: todownload
                    };
                    let retryCount = 0
                    let yargiTuru = UYAP_EXT.TOOL.yargiTuru.get(dosya_bilgileri.birimTuru3);
                    let url = Application.getDownloadURL(yargiTuru);
                    let _yargiBirimi = getYargiBirimi(dosya_bilgileri.birimAdi)
                    if(dosya_bilgileri.dosyaTurKod==35){
                        let pdf= await UYAP_EXT.TOOL.pdfDosyaKapakHesabi(dosya_bilgileri.birimAdi,dosya_bilgileri.dosyaNo,dosya_bilgileri.dosyaId);
                        try {
                            pdf.getDataUrl((s)=>{
                                let _filename=Application.SESSION.adiSoyadi + "/" + _yargiBirimi + "/" + dosya_bilgileri.birimAdi + " " + (dosya_bilgileri.dosyaNo ? dosya_bilgileri.dosyaNo.replaceAll("/", "-") : dosya_bilgileri.esasNo ? dosya_bilgileri.esasNo.replaceAll("/", "-") : dosya_bilgileri.dosyaId) + "/" +"0-DOSYA KAPAK HESABI.pdf"
                                let _data=UYAP_EXT.TOOL.messageToPortal({ask:"downloadFile",params:{
                                        url: s,
                                        filename: _filename.normalize(UYAP_EXT.TOOL.systemInformation.fileNameEncoding).replace(/[^\S ]/g, '')
                                    }})

                            });

                        }catch (e) {

                        }
                    }
                    for (let index = 0; index < todownload.length; index++) {
                        if (!UYAP_EXT.DIALOG.blockUILogo.container.isConnected) {
                            break;
                        }

                        if (todownload[index][0] != "dosya") {
                            hh++;
                            let filename =  Application.SESSION.adiSoyadi + "/" + _yargiBirimi + "/" + dosya_bilgileri.birimAdi + " " + (dosya_bilgileri.dosyaNo ? dosya_bilgileri.dosyaNo.replaceAll("/", "-") : dosya_bilgileri.esasNo ? dosya_bilgileri.esasNo.replaceAll("/", "-") : dosya_bilgileri.dosyaId) + "/" + hh + " - " + todownload[index][1].evrak.turu.replaceAll("/", "_") + " ( " + (new Date(todownload[index][1].evrak.onayTarihi) instanceof Date && !isNaN(new Date(todownload[index][1].evrak.onayTarihi)) ? new Date(todownload[index][1].evrak.onayTarihi).toLocaleDateString('tr-TR') : new Date().toLocaleDateString('tr-TR')) + " )";

                            document.getElementById("dialog_son").innerText = todownload[index][1].evrak.turu + "....(" + (hh).toString() + "/" + results.length + ")";

                            let values = {
                                evrakId: todownload[index][1].evrak.evrakId,
                                dosyaId: todownload[index][1].evrak.dosyaId,
                                yargiTuru: yargiTuru,
                                table_dosya: todownload[index][1].evrak.table_name,//FIXME boş atıyor
                                md5: todownload[index][1].evrak.md5
                            };
                            try {
                                if (todownload[index][1].evrak.evrakId != downloaded[index][1].evrak.evrakId) {
                                    let dedes
                                    try {
                                        dedes = await indir(values, url, filename);
                                    } catch (e) {
                                        break;
                                    }


                                    if (dedes.success == false) {
                                        if (retryCount > 8) {

                                            if (dedes.reload == true) {
                                                await UYAP_EXT.DIALOG.uyapBagantisiKesildi(19);
                                            }
                                            retryCount = 0;
                                        } else {
                                            index--;
                                            hh--;
                                            retryCount++;
                                            UYAP_EXT.TOOL.options.requestInterval=UYAP_EXT.TOOL.options.requestInterval<1500? UYAP_EXT.TOOL.options.requestInterval+= 150:UYAP_EXT.TOOL.options.requestInterval;
                                            UYAP_EXT.TOOL.user = user;
                                            continue
                                        }

                                    }
                                    if (dedes.url) {
                                        let _data=await UYAP_EXT.TOOL.messageToPortal({ask:"downloadFile",params:{
                                                url: dedes.url,
                                                filename: dedes.filename,
                                                md5: todownload[index][1].evrak.md5
                                            }});
                                        if(_data.result){
                                            user.interrupts.filedownload[value.get("dosya").dosyaId].downloaded[index] = [todownload[index][0], {
                                                evrak: todownload[index][1].evrak,
                                                ekler: []
                                            }];
                                        }

                                        retryCount = 0;
                                        UYAP_EXT.TOOL.options.requestInterval = UYAP_EXT.TOOL.options.requestInterval > 100 ? UYAP_EXT.TOOL.options.requestInterval -= 100 : 100;
                                        UYAP_EXT.TOOL.user = user;
                                    }


                                }
                            } catch (error) {
                                let dedes
                                try {
                                    dedes = await indir(values, url, filename);
                                } catch (e) {
                                    break;
                                }


                                if (dedes.success == false) {

                                    if (retryCount > 8) {

                                        if (dedes.reload == true) {
                                            await UYAP_EXT.DIALOG.uyapBagantisiKesildi(19);
                                        }
                                        retryCount = 0;
                                    } else {
                                        index--;
                                        hh--;
                                        retryCount++;
                                        UYAP_EXT.TOOL.options.requestInterval=UYAP_EXT.TOOL.options.requestInterval<1500? UYAP_EXT.TOOL.options.requestInterval+= 150:UYAP_EXT.TOOL.options.requestInterval;
                                        UYAP_EXT.TOOL.user = user;
                                        continue
                                    }
                                }
                                if (dedes.url) {
                                    let _data=await UYAP_EXT.TOOL.messageToPortal({ask:"downloadFile",params:{
                                            url: dedes.url,
                                            filename: dedes.filename,
                                            md5: todownload[index][1].evrak.md5
                                        }});
                                    if(_data.result){
                                        user.interrupts.filedownload[value.get("dosya").dosyaId].downloaded[index] = [todownload[index][0], {
                                            evrak: todownload[index][1].evrak,
                                            ekler: []
                                        }];
                                    }
                                    retryCount = 0;
                                    UYAP_EXT.TOOL.options.requestInterval = UYAP_EXT.TOOL.options.requestInterval > 100 ? UYAP_EXT.TOOL.options.requestInterval -= 100 : 100;
                                    UYAP_EXT.TOOL.user = user;
                                }


                            }


                            for (let frtf = 0; frtf < todownload[index][1].ekler.length; frtf++) {
                                if (!UYAP_EXT.DIALOG.blockUILogo.container.isConnected) {
                                    break;
                                }
                                hh++
                                let filename2 =  Application.SESSION.adiSoyadi + "/" + _yargiBirimi + "/" + dosya_bilgileri.birimAdi + " " + (dosya_bilgileri.dosyaNo ? dosya_bilgileri.dosyaNo.replaceAll("/", "-") : dosya_bilgileri.esasNo ? dosya_bilgileri.esasNo.replaceAll("/", "-") : dosya_bilgileri.dosyaId) + "/" + hh + " - EK-" + (frtf + 1).toString() + "(" +todownload[index][1].evrak.turu.replaceAll("/", "_") + ")";
                                document.getElementById("dialog_son").innerText = todownload[index][1].evrak.turu + " EKİ - " + (frtf + 1).toString() + "....(" + (hh).toString() + "/" + results.length + ")";


                                values = {
                                    evrakId: todownload[index][1].ekler[frtf].evrakId,
                                    dosyaId: todownload[index][1].ekler[frtf].dosyaId,
                                    yargiTuru: yargiTuru,
                                    table_dosya: todownload[index][1].ekler[frtf].table_name,
                                    md5: todownload[index][1].ekler[frtf].md5
                                }
                                try {
                                    if (downloaded[index][1].ekler[frtf].evrakId != todownload[index][1].ekler[frtf].evrakId) {
                                        let dedes
                                        try {
                                            dedes = await indir(values, url, filename2);
                                        } catch (e) {
                                            break;
                                        }

                                        if (dedes.success == false) {

                                            if (retryCount > 8) {

                                                if (dedes.reload == true) {
                                                    await UYAP_EXT.DIALOG.uyapBagantisiKesildi(19);
                                                }
                                                retryCount = 0;
                                            } else {
                                                frtf--;
                                                hh--;
                                                retryCount++;
                                                UYAP_EXT.TOOL.options.requestInterval=UYAP_EXT.TOOL.options.requestInterval<1500? UYAP_EXT.TOOL.options.requestInterval+= 150:UYAP_EXT.TOOL.options.requestInterval;
                                                UYAP_EXT.TOOL.user = user;
                                                continue;

                                            }
                                        }
                                        if (dedes.url) {
                                            let _data=await UYAP_EXT.TOOL.messageToPortal({ask:"downloadFile",params:{
                                                    url: dedes.url,
                                                    filename: dedes.filename,
                                                    md5: todownload[index][1].ekler[frtf].md5
                                                }});
                                            if(_data.result){
                                                user.interrupts.filedownload[value.get("dosya").dosyaId].downloaded[index][1].ekler[frtf] = todownload[index][1].ekler[frtf];
                                            }

                                            retryCount = 0;
                                            UYAP_EXT.TOOL.options.requestInterval = UYAP_EXT.TOOL.options.requestInterval > 100 ? UYAP_EXT.TOOL.options.requestInterval -= 100 : 100;
                                            UYAP_EXT.TOOL.user = user;

                                        }


                                    }
                                } catch (error) {
                                    let dedes
                                    try {
                                        dedes = await indir(values, url, filename2);
                                    } catch (e) {
                                        break;
                                    }

                                    if (dedes.success == false) {

                                        if (retryCount > 8) {

                                            if (dedes.reload == true) {
                                                await UYAP_EXT.DIALOG.uyapBagantisiKesildi(19);
                                            }
                                            retryCount = 0;
                                        } else {
                                            frtf--;
                                            hh--;
                                            retryCount++;
                                            UYAP_EXT.TOOL.options.requestInterval=UYAP_EXT.TOOL.options.requestInterval<1500? UYAP_EXT.TOOL.options.requestInterval+= 150:UYAP_EXT.TOOL.options.requestInterval;
                                            UYAP_EXT.TOOL.user = user;

                                        }
                                    }
                                    if (dedes.url) {
                                        let _data=await UYAP_EXT.TOOL.messageToPortal({ask:"downloadFile",params:{
                                                url: dedes.url,
                                                filename: dedes.filename,
                                                md5: todownload[index][1].ekler[frtf].md5
                                            }});
                                        if(_data.result){
                                            user.interrupts.filedownload[value.get("dosya").dosyaId].downloaded[index][1].ekler[frtf] = todownload[index][1].ekler[frtf];
                                        }

                                        retryCount = 0;
                                        UYAP_EXT.TOOL.options.requestInterval = UYAP_EXT.TOOL.options.requestInterval > 100 ? UYAP_EXT.TOOL.options.requestInterval -= 100 : 100;
                                        UYAP_EXT.TOOL.user = user;
                                    }

                                }


                            }


                        }

                    }

                    if (UYAP_EXT.DIALOG.blockUILogo.container.isConnected) {
                        if (Object.keys(user.interrupts.filedownload).length > 1) {
                            delete user.interrupts.filedownload[value.get("dosya").dosyaId];
                        } else {
                            delete user.interrupts.filedownload;
                        }
                        UYAP_EXT.DIALOG.blockUILogo.hide();
                        let islemBitti = `<p>${dosya_bilgileri.birimAdi + " " + (dosya_bilgileri.esasNo ? dosya_bilgileri.esasNo + " E." : dosya_bilgileri.dosyaNo ? dosya_bilgileri.dosyaNo + " E. " : "")} Numaralı Dosyanıza Ait Evraklar Başarıyla İndirilmiştir.
                                        <br>
                                        <br>
                                      </p>`
                        let tmm = document.createElement('div');
                        tmm.innerText = 'Tamam';
                        tmm.className = "button positive";
                        tmm.onfunc = async function (params) {
                            UYAP_EXT.DIALOG.user_dialog.hide();
                            return true;
                        }

                        let center = {
                            mesaj: islemBitti,
                            buttons: [tmm],

                        }
                        await UYAP_EXT.DIALOG.user_dialog.show(center);
                    }
                    UYAP_EXT.TOOL.user = user;
                    $(UYAP_EXT.DIALOG.ActiveLightbox.modal).fadeIn();


                })
                _dosyaLi.append(_downloadButton);


                let _dosyaUl = document.createElement('ul');
                _dosyaLi.append(_dosyaUl);
                if (value instanceof Map) {
                    for (let [key, val] of value) {
                        if (key == "dosya") {
                            continue;
                        }
                        let _evraktable = val.evrak.table_name;
                        val.evrak.evraklar_md5 = val.evrak.md5;
                        if (val.ekler.length > 0) {
                            sayacevrak++;
                            let _evrak = document.createElement("li");

                            _evrak.innerText = val.evrak.turu + " ( " + (val.evrak.veriTabaniTarihi ? val.evrak.veriTabaniTarihi.toLocaleDateString('tr-TR') : val.evrak.onayTarihi.toLocaleDateString('tr-TR')) + " )";
                            _evrak.title = val.evrak.gonderenYer + "\nAçıklama:" + val.evrak.aciklama
                            let _eklerUl = document.createElement('ul');
                            let _anaevrak = document.createElement('li');
                            _anaevrak.dataset.evrakId = val.evrak.evrakId;
                            _anaevrak.dataset.birimTuru3 = dosya_bilgileri.birimTuru3;
                            _anaevrak.dataset.dosyaId = val.evrak.dosyaId;
                            _anaevrak.dataset.filename = val.evrak.turu + " ( " + (val.evrak.veriTabaniTarihi ? val.evrak.veriTabaniTarihi.toLocaleDateString('tr-TR') : val.evrak.onayTarihi.toLocaleDateString('tr-TR')) + " )";
                            _anaevrak.className = "lastli";
                            _anaevrak.onclick = function (event) {
                                if (event.target == this) {
                                    UYAP_EXT.TOOL.fileGoruntule(val.evrak.evrakId, val.evrak.anaevrakId, val.evrak.dosyaId, dosya_bilgileri.birimTuru3 ? dosya_bilgileri.birimTuru3 : _evraktable);
                                    event.stopPropagation();
                                }

                            }
                            _anaevrak.innerHTML = val.evrak.turu + " ( " + (val.evrak.veriTabaniTarihi ? val.evrak.veriTabaniTarihi.toLocaleDateString('tr-TR') : val.evrak.onayTarihi.toLocaleDateString('tr-TR')) + " )";

                            _anaevrak.append(buttonDownload(function (event) {
                                event.stopPropagation()
                                UYAP_EXT.TOOL.fileDownload(val.evrak.evrakId, val.evrak.dosyaId, dosya_bilgileri.birimTuru3 ? dosya_bilgileri.birimTuru3 : _evraktable);

                            }));



                            _eklerUl.append(_anaevrak);
                            for (let juk = 0; juk < val.ekler.length; juk++) {
                                let _ek = document.createElement("li");
                                _ek.dataset.evrakId = val.ekler[juk].evrakId;
                                _ek.dataset.birimTuru3 = dosya_bilgileri.birimTuru3;
                                _ek.dataset.dosyaId = val.ekler[juk].dosyaId;
                                _ek.dataset.filename = "Ek-" + (juk + 1).toString();

                                _ek.className = "lastli";
                                _ek.innerText = "Ek-" + (juk + 1).toString();
                                _ek.onclick = function (event) {
                                    if (event.target == this) {
                                        UYAP_EXT.TOOL.fileGoruntule(val.ekler[juk].evrakId, val.ekler[juk].anaevrakId, val.ekler[juk].dosyaId, dosya_bilgileri.birimTuru3 ? dosya_bilgileri.birimTuru3 : _evraktable);
                                        event.stopPropagation();
                                    }
                                }

                                _ek.append(buttonDownload(function (event) {
                                    event.stopPropagation()
                                    UYAP_EXT.TOOL.fileDownload(val.ekler[juk].evrakId, val.ekler[juk].dosyaId, dosya_bilgileri.birimTuru3 ? dosya_bilgileri.birimTuru3 : _evraktable);

                                }));


                                _eklerUl.append(_ek);

                            }

                            _evrak.append(_eklerUl);
                            _dosyaUl.append(_evrak);
                        } else {
                            sayacevrak++;
                            let _evrak = document.createElement("li");
                            _evrak.onclick = function (event) {
                                if (event.target == this) {
                                    UYAP_EXT.TOOL.fileGoruntule(val.evrak.evrakId, val.evrak.anaevrakId, val.evrak.dosyaId, dosya_bilgileri.birimTuru3 ? dosya_bilgileri.birimTuru3 : _evraktable);
                                    event.stopPropagation();
                                }

                            }
                            _evrak.className = "lastli";
                            _evrak.dataset.evrakId = val.evrak.evrakId;
                            _evrak.dataset.birimTuru3 = dosya_bilgileri.birimTuru3;
                            _evrak.dataset.dosyaId = val.evrak.dosyaId;
                            _evrak.dataset.filename = val.evrak.turu + " ( " + (val.evrak.veriTabaniTarihi ? val.evrak.veriTabaniTarihi.toLocaleDateString('tr-TR') : val.evrak.onayTarihi.toLocaleDateString('tr-TR')) + " )";
                            _evrak.innerText = val.evrak.turu + " ( " + (val.evrak.veriTabaniTarihi ? val.evrak.veriTabaniTarihi.toLocaleDateString('tr-TR') : val.evrak.onayTarihi.toLocaleDateString('tr-TR')) + " )";
                            _evrak.title = val.evrak.gonderenYer + "\nAçıklama:" + val.evrak.aciklama;

                            _evrak.append(buttonDownload(function (event) {

                                UYAP_EXT.TOOL.fileDownload(val.evrak.evrakId, val.evrak.dosyaId, dosya_bilgileri.birimTuru3 ? dosya_bilgileri.birimTuru3 : _evraktable);

                            }));


                            _dosyaUl.append(_evrak);
                        }

                    }

                }

                _mainUl.append(_dosyaLi);
                if (sayacevrak > 8000) {
                    alert("Bulunan " + results.length + " Evrakınızın " + sayacevrak + " Tanesi Gösteriliyor.\n Aramanızı Daraltınız.");
                    break;
                }

            }

            var allFolders = $(_mainUl).find("li > ul");
            allFolders.each(function () {

                // add the folder class to the parent <li>
                var folderAndName = $(this).parent();
                folderAndName.addClass("folder");

                // backup this inner <ul>
                var backupOfThisFolder = $(this);
                // then delete it
                $(this).remove();
                // add an <a> tag to whats left ie. the folder name
                folderAndName.wrapInner("<a href='#' />");
                // then put the inner <ul> back
                folderAndName.append(backupOfThisFolder);

                // now add a slideToggle to the <a> we just added
                folderAndName.find("a").click(function (e) {
                    if (e.target == this) {
                        $(this).siblings("ul").slideToggle("slow");
                        e.preventDefault();
                    }

                });

            });


            if (sayacevrak == 0) {
                _mainUl.innerHTML = "<div class='merkezuyari'>Aradığınız Kriterlerde Evrak Bulunamadı</div>";
            }

            return _mainUl;
        },
        filtrelerUlcreate: function (icerik) {
            function getEvrakDistinct(icerik) {
                let evrakTuru = [];
                let evrakTipi = [];
                let evrakAciklama = [];
                let evrakBirimAdi = [];
                let evrakDosyaNo = [];

                function _distinct(arr, item) {
                    if (arr.indexOf(item) < 0 && item != undefined) {
                        arr.push(item);
                    }
                }

                for (let index = 0; index < icerik.evraklar.length; index++) {
                    _distinct(evrakTuru, icerik.evraklar[index].turu);
                    _distinct(evrakTipi, icerik.evraklar[index].tipi);
                    _distinct(evrakAciklama, icerik.evraklar[index].aciklama);
                    _distinct(evrakBirimAdi, icerik.evraklar[index].birimAdi);
                    _distinct(evrakDosyaNo, icerik.evraklar[index].dosyaNo);

                }

                evrakTuru.sort();
                evrakTipi.sort();
                evrakAciklama.sort();
                evrakBirimAdi.sort();
                evrakDosyaNo.sort();
                return {
                    evrakTuru: evrakTuru,
                    evrakTipi: evrakTipi,
                    evrakAciklama: evrakAciklama,
                    evrakBirimAdi: evrakBirimAdi,
                    evrakDosyaNo: evrakDosyaNo
                }

            }

            function applyFilter(icerik) {
                let _clone = $.extend(true, {}, icerik);

                function filter(options, select, tables) {
                    for (let fsdfs = 0; fsdfs < tables.length; fsdfs++) {
                        let ddff = [];
                        for (let index = 0; index < _clone[tables[fsdfs]].length; index++) {
                            let res = false;
                            for (let qwq = 0; qwq < options.length; qwq++) {
                                if (_clone[tables[fsdfs]][index][select] == options[qwq].value || select == null) {
                                    res = true;
                                    break;
                                }
                                if (_clone[tables[fsdfs]][index].anaevrakId != null) {
                                    let found = _clone[tables[fsdfs]].find((element) => {
                                        return element.evrakId == _clone[tables[fsdfs]][index].anaevrakId
                                    });
                                    if (found[select] == options[qwq].value || select == null) {
                                        res = true;
                                        break;
                                    }
                                }

                            }

                            if (res) {
                                ddff.push(_clone[tables[fsdfs]][index]);
                            }
                        }
                        _clone[[tables[fsdfs]]] = ddff;
                    }


                }


                filter(selectTipi.selectedOptions, "tipi", ["evraklar"]);
                filter(selectTuru.selectedOptions, "turu", ["evraklar"]);
                filter(selectAciklama.selectedOptions, "aciklama", ["evraklar"]);


                $(".notlarim_anadiv .directory-list").replaceWith(UYAP_EXT.DIALOG.openEvrakList.folderEvraklarListCreateDateOrder(_clone));


            }

            let filtrelerUl = document.createElement('ul');
            filtrelerUl.className = "notlarim_filterUl form-style-1";


            let baslangic = icerik.baslangicTarihi;
            let baslangicTarihi = document.createElement("input");
            baslangicTarihi.type = "date";
            baslangicTarihi.valueAsDate = baslangic;
            baslangicTarihi.onchange = function (params) {
                if (baslangicTarihi.valueAsDate <= bitisTarihi.valueAsDate) {
                    UYAP_EXT.DIALOG.blockUILogo.show("", "", "", ".gslide-media");
                    UYAP_EXT.DIALOG.openEvrakList.evrakFilter({
                        baslangicTarihi: baslangicTarihi.valueAsDate,
                        bitisTarihi: bitisTarihi.valueAsDate,
                        evraktable: icerik.evraktable,
                        dosyatable: icerik.dosyatable,
                        dosyaId: icerik.dosyaId
                    }).then(ft => {
                        $(".notlarim_filterUl").replaceWith(UYAP_EXT.DIALOG.openEvrakList.filtrelerUlcreate(ft));
                        $(".notlarim_anadiv .directory-list").replaceWith(UYAP_EXT.DIALOG.openEvrakList.folderEvraklarListCreateDateOrder(ft));
                        UYAP_EXT.DIALOG.blockUILogo.hide();
                    });
                } else {

                    alert("Başlangıç Tarihi Bitiş Tarihinden Büyük Olamaz.");
                    baslangicTarihi.valueAsDate = baslangic;
                }


            }


            let bitis = icerik.bitisTarihi;
            let bitisTarihi = document.createElement("input");
            bitisTarihi.type = "date";
            bitisTarihi.valueAsDate = bitis;
            bitisTarihi.onchange = function (params) {
                if (baslangicTarihi.valueAsDate <= bitisTarihi.valueAsDate) {
                    UYAP_EXT.DIALOG.blockUILogo.show("", "", "", ".gslide-media");
                    UYAP_EXT.DIALOG.openEvrakList.evrakFilter({
                        baslangicTarihi: baslangicTarihi.valueAsDate,
                        bitisTarihi: bitisTarihi.valueAsDate,
                        evraktable: icerik.evraktable,
                        dosyatable: icerik.dosyatable,
                        dosyaId: icerik.dosyaId
                    }).then(ft => {
                        $(".notlarim_filterUl").replaceWith(UYAP_EXT.DIALOG.openEvrakList.filtrelerUlcreate(ft));
                        $(".notlarim_anadiv .directory-list").replaceWith(UYAP_EXT.DIALOG.openEvrakList.folderEvraklarListCreateDateOrder(ft));

                        UYAP_EXT.DIALOG.blockUILogo.hide();


                    });
                } else {

                    alert("Başlangıç Tarihi Bitiş Tarihinden Büyük Olamaz.");
                    bitisTarihi.valueAsDate = bitis;
                }


            }

            let evrakDistinct = getEvrakDistinct(icerik);

            let tipi = evrakDistinct.evrakTipi;
            let selectTipi = document.createElement('select');
            selectTipi.setAttribute("multiple", "");
            for (let dcsdcsd = 0; dcsdcsd < tipi.length; dcsdcsd++) {
                let optionTipi = document.createElement('option');
                optionTipi.innerText = tipi[dcsdcsd];
                optionTipi.value = tipi[dcsdcsd];
                optionTipi.selected = true;
                selectTipi.append(optionTipi);
            }


            let turu = evrakDistinct.evrakTuru;
            let selectTuru = document.createElement('select');
            selectTuru.setAttribute("multiple", "");
            for (let dcsdcsd = 0; dcsdcsd < turu.length; dcsdcsd++) {
                let optionTuru = document.createElement('option');
                optionTuru.innerText = turu[dcsdcsd];
                optionTuru.value = turu[dcsdcsd];
                optionTuru.selected = true;
                selectTuru.append(optionTuru);
            }


            let aciklama = evrakDistinct.evrakAciklama;
            let selectAciklama = document.createElement('select');
            selectAciklama.setAttribute("multiple", "");
            for (let dcsdcsd = 0; dcsdcsd < aciklama.length; dcsdcsd++) {
                let optionTuru = document.createElement('option');
                optionTuru.innerText = aciklama[dcsdcsd];
                optionTuru.value = aciklama[dcsdcsd];
                optionTuru.selected = true;
                selectAciklama.append(optionTuru);
            }


            $(filtrelerUl).append(baslangicTarihi, bitisTarihi, selectTipi, selectTuru, selectAciklama);
            $(filtrelerUl).children().wrap("<li></li>");
            $(baslangicTarihi).before("<label>Başlangış Tarihi:</label>");
            $(bitisTarihi).before("<label>Bitiş Tarihi:</label>");
            $(selectTipi).before("<label>Evrak Tipi:</label>");
            $(selectTuru).before("<label>Evrak Turu:</label>");
            $(selectAciklama).before("<label>Evrak Açıklaması:</label>");
            $(selectTipi).SumoSelect({
                placeholder: 'Evrak Tipi',
                csvDispCount: 3,
                captionFormat: '{0} Şeçildi',
                captionFormatAllSelected: '{0} Hepsi Seçildi!',
                okCancelInMulti: true,
                selectAll: true,
                searchText: 'Ara...',
                searchFn: function (haystack, needle, el) {
                    return haystack.toLocaleLowerCase('tr-TR').indexOf(needle.toLocaleLowerCase('tr-TR')) < 0;
                },
                noMatch: 'Sonuç "{0}"',
                prefix: '',
                locale: ['Tamam', 'İptal', 'Hepsini Seç'],
                up: false,
                showTitle: true,
                renderLi: (li, originalOption) => li
            }).onchange = function () {
                applyFilter(icerik);

            }

            $(selectTuru).SumoSelect({
                placeholder: 'Evrak Türü',
                csvDispCount: 3,
                captionFormat: '{0} Şeçildi',
                captionFormatAllSelected: '{0} Hepsi Seçildi!',
                okCancelInMulti: true,
                selectAll: true,
                search: true,
                searchText: 'Ara...',
                searchFn: function (haystack, needle, el) {
                    return haystack.toLocaleLowerCase('tr-TR').indexOf(needle.toLocaleLowerCase('tr-TR')) < 0;
                },
                noMatch: 'Sonuç "{0}"',
                prefix: '',
                locale: ['Tamam', 'İptal', 'Hepsini Seç'],
                up: false,
                showTitle: true,
                renderLi: (li, originalOption) => li
            }).onchange = function () {
                applyFilter(icerik);

            };
            $(selectAciklama).SumoSelect({
                placeholder: 'Evrak Açıklaması',
                csvDispCount: 3,
                captionFormat: '{0} Şeçildi',
                captionFormatAllSelected: '{0} Hepsi Seçildi!',
                okCancelInMulti: true,
                selectAll: true,
                search: true,
                searchText: 'Ara...',
                searchFn: function (haystack, needle, el) {
                    return haystack.toLocaleLowerCase('tr-TR').indexOf(needle.toLocaleLowerCase('tr-TR')) < 0;
                },
                noMatch: 'Sonuç "{0}"',
                prefix: '',
                locale: ['Tamam', 'İptal', 'Hepsini Seç'],
                up: false,
                showTitle: true,
                renderLi: (li, originalOption) => li
            }).onchange = function () {
                applyFilter(icerik);

            };


            return filtrelerUl;
        },
        openMygalleryEvrakAra: function (icerik) {
            let anaDiv = document.createElement("div");
            anaDiv.className = "notlarim_anadiv";
            anaDiv.append(this.filtrelerUlcreate(icerik));
            anaDiv.append(this.folderEvraklarListCreateDateOrder(icerik));
            UYAP_EXT.DIALOG.blockUILogo.hide();
            UYAP_EXT.DIALOG.PassiveLightbox = UYAP_EXT.DIALOG.ActiveLightbox;
            UYAP_EXT.DIALOG.ActiveLightbox = UYAP_EXT.DIALOG.myGalleryEvrakList = GLightbox({
                elements: [{
                    'content': anaDiv,
                    'width': '90%', // read more in the API section
                    'height': '95vh'

                }],
                draggable: false,
                closeOnOutsideClick: false,
                zoomable: false,
                preload: false

            });

            UYAP_EXT.DIALOG.myGalleryEvrakList.on("open", () => {
                $(".gclose").on("click", function () {
                    $(UYAP_EXT.DIALOG.openEvrakList.modal).closest(".modal").modal('show');
                });
            });
            UYAP_EXT.DIALOG.myGalleryEvrakList.open();

        }
    },

}
UYAP_EXT.TOOL = {
    systemInformation:(function(uaparser) {
            uaparser.fileNameEncoding=uaparser.os.name=="Mac OS"?"NFD":undefined;
            return uaparser;
        }
    )(UAParser()),
    messageToPortal:function (message) {
        return new Promise((res, rej) => {
            const channel = new MessageChannel();

            channel.port1.onmessage = ({data}) => {
                channel.port1.close();
                res(data)
            };
            window.postMessage(message,location.protocol+"//vatandas.uyap.gov.tr", [channel.port2]);
        })
    },
    makeRequest: function (url, send, wait = 0, responseType, progress) {
        let requestResolve = null;
        let requestReject = null;
        let XHR = new XMLHttpRequest();
        let promise = new Promise(function (resolve, reject) {
            requestResolve = resolve;
            requestReject = reject;
            XHR.open("POST", url, true);
            XHR.timeout = 60000;
            XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            if (responseType == "application/download") {
                XHR.responseType = "blob";
                XHR.timeout = 0;
            }

            XHR.onreadystatechange = function () {
                if (XHR.readyState == XMLHttpRequest.HEADERS_RECEIVED) {
                    XHR.timeout = 0;
                }

            };
            XHR.onload = async function () {

                try {
                    if (XHR.status == 403) {
                        resolve({success: false, xhr: XHR});
                        return;
                    }
                    if (XHR.responseXML.getElementsByTagName("error").length > 0) {
                        if (XHR.responseXML.getElementsByTagName("error")[0].innerHTML == "nosessionobject") {
                            await UYAP_EXT.DIALOG.uyapBagantisiKesildi(0);
                        }
                        resolve({success: false, xhr: XHR});
                        return;
                    }


                } catch (error) {

                }

                resolve({success: true, xhr: XHR});
            };
            XHR.onerror = function (err) {
                XHR.abort();
            };
            XHR.ontimeout = (e) => {
                XHR.abort();
            };
            XHR.onprogress = function (def) {
                XHR.timeout = 0;
                if (progress) {
                    progress(def);
                }

            }
            XHR.onabort = function () {
                resolve({success: false, xhr: XHR});
            }
            setTimeout(() => {
                XHR.send(send);

            }, wait);

        });
        return {resolve: requestResolve, reject: requestReject, promise: promise, XHR: XHR}
    },
    fileGoruntule: function (evrakId, anaevrakId, dosyaId, birimTuru3) {

        sendToServer('dosya_evrak_turu_brd', {
            evrakId: evrakId,
            a: anaevrakId
        }, function (xml, cmd, args, callBackParams) {
            var mimeType = $(xml).find('MimeTypes').text();
            viewDocCustomTarget({
                mimeType: mimeType,
                evrakId: callBackParams.evrak_id,
                dosyaId: dosyaId,
                yargiTuru: UYAP_EXT.TOOL.yargiTuru.get(birimTuru3)
            });
        }, null, {
            evrak_id: evrakId,
            ana_evrak_id: anaevrakId
        });
    },
    fileDownload: function (evrakId, dosyaId, birimTuru3) {

        downloadDocCustom({
            evrakId: evrakId,
            dosyaId: dosyaId,
            yargiTuru: UYAP_EXT.TOOL.yargiTuru.get(birimTuru3)
        });
    },
    fileIntegrityCheck: async function (XHR, file) {
        //reload true dönerse sebebini bildirir window.reload yapılıp yapılmamasına karar verilecek
        if (!XHR.response) {
            return ({success: false, xhr: XHR, reload: false});
        }
        const string = await XHR.response.text();
        if (/Evrak UYAP sistemine yüklenmemiş/igm.test(string)) {
            return ({success: null, xhr: XHR});
        }
        if (/Evrak bulunamadı veya yetkiniz/igm.test(string)) {
            return ({success: null, xhr: XHR});
        }
        if (/vekil kaydınız bulunmamaktadır/igm.test(string)) {
            await UYAP_EXT.TOOL.cleanUp.deleteEvrak(file.table_dosya.indexOf("yargitay") >= 0 ? "yargitayevraklar" : "evraklar", file.md5);
            return ({success: true, xhr: XHR});
        }
        if (/Hata Oluştu/igm.test(string)) {
            return ({success: false, xhr: XHR, reload: true});
        }

        return ({success: true, xhr: XHR});
    },
    pdfDosyaKapakHesabi:async function (birimAdi,dosyaNo,dosyaId) {
        let retrycount=0,demen;
        doloop:do {
            demen= await UYAP_EXT.TOOL.makeRequest("/main/jsp/avukat/dosya_hesap_bilgileri.ajx", "dosyaId=" + dosyaId.toString() , UYAP_EXT.TOOL.options.requestInterval).promise;
            if (demen.success == true) {
                UYAP_EXT.TOOL.options.requestInterval = UYAP_EXT.TOOL.options.requestInterval > 100 ? UYAP_EXT.TOOL.options.requestInterval -= 100 : 100;
                break;
            } else {
                retrycount++;//VERSION Burası hariç bütün do while döngülerinde retrycountun yerinin yanlış yazılmış olma ihtimali var
                let responseIntegrity = UYAP_EXT.TOOL.responseIntegrityCheck(demen.xhr);
                switch (responseIntegrity.result) {
                    case 'yetkisiz':
                        return false;
                        break doloop;
                        break;
                    case 'hata':
                        break;
                    case 'vekaletsiz':
                        UYAP_EXT.TOOL.cleanUp.deleteDosya("dosyalar", parseInt(dosyaId), true);
                        return false;
                        break doloop;
                        break;
                    default:
                        break;
                }
                if (retrycount > 8) {
                    await UYAP_EXT.DIALOG.uyapBagantisiKesildi(36);
                    throw "bağlantı kesildi";
                    break;
                }

                UYAP_EXT.TOOL.options.requestInterval=UYAP_EXT.TOOL.options.requestInterval<1500? UYAP_EXT.TOOL.options.requestInterval+= 150:UYAP_EXT.TOOL.options.requestInterval;
            }
        } while (retrycount < 9);
        let _response=JSON.parse(demen.xhr.response);
        const docDefinition = {
            content: [
                {
                    alignment: 'right',
                    text: new Date().toLocaleDateString("tr"),
                    style: 'header',
                    fontSize: 11,
                    margin: [0, 10],
                },
                {
                    alignment: 'center',
                    text: 'DOSYA KAPAK HESABI',
                    style: 'header',
                    fontSize: 23,
                    bold: true,
                    margin: [0, 10],
                },
                {
                    margin: [0, 0, 0, 10],
                    layout: {
                        fillColor: '#ebebeb',
                        defaultBorder: false
                    },
                    table: {
                        widths: [ "auto", 'auto', "*"],
                        fontSize:11,
                        heights: [20,10],
                        body: [
                            [
                                {
                                    border: [true, true, false, true],
                                    text: 'İCRA DAİRESİ',
                                    bold: true,
                                },
                                {
                                    border: [false, true, false, true],
                                    text: ':',
                                    bold: true,
                                },
                                {
                                    border: [false, true, true, true],
                                    text: birimAdi,
                                    bold: true,
                                }
                            ],
                            [
                                {
                                    border: [true, true, false, true],
                                    text: 'DOSYA NO',
                                    bold: true,
                                },
                                {
                                    border: [false, true, false, true],
                                    text: ':',
                                    bold: true,
                                },
                                {
                                    border: [false, true, true, true],
                                    text: dosyaNo,
                                    bold: true,
                                }
                            ],
                        ],
                    }
                },
                {
                    style: 'tableExample',
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex === 0) ? '#c2dec2' : null;
                        }
                    },
                    table: {
                        widths: ['50%', '50%'],
                        heights: [10,10],
                        body: [
                        ]
                    }
                }
            ]
        };
        for (let i = 0; i < _response.length; i++) {
            let _row= [{
                text:_response[i].textAlan
            },
                {
                    text:_response[i].degerAlan?_response[i].degerAlan.toString().replaceAll(".",",")+" TL":"-"

                }];
            if(i==_response.length-1){
                _row[0].fillColor="orangered";
                _row[1].fillColor="orangered";
            }
            docDefinition.content[3].table.body.push(_row)
        }


        return pdf = pdfMake.createPdf(docDefinition);
    },
    yargiTuru: new Map([
        ["0991", 1],
        ["0992", 1],
        ["1199", 1],
        ["0993", 6],
        ["9701", 11],
        ["6700", 25],
        ["danistay", 2],
        ["yargitay", 3],
        ["cbs", 1],
        ["cbsdosyalar", 1],
        ["evraklar", 2],
        ["dosyalar", 1],
        ["yargitayevraklar", 3],
        ["yargitaydosyalar", 3]

    ]),
    _user: {interrupts:{
        filedownload:{}
        }
    },
    options:{
        requestInterval:200
    },
    get user() {
        let okuma = JSON.parse(localStorage.getItem(Application.SESSION.TC_KIMLIK_NO), (key, value) => {
            if (typeof value === "string" && key != "aciklama") {
                if (value.charAt(0) == "[") {
                    return JSON.parse(value);
                }
            }
            return value;
        });

        function mergeDeep(source) {
            if ((source && typeof source === 'object')) {
                for (const key in source) {
                    if (source[key] && typeof source[key] === 'object') {
                        mergeDeep(source[key]);
                    } else {
                        if (key.toLowerCase().indexOf("tarih") >= 0) {
                            source[key] = new Date(source[key]);
                        }

                    }
                }
            }
            return source;
        }

        mergeDeep(okuma);
        if (okuma){
            this._user=okuma
        }

        return this._user;
    },
    set user(userU) {
        localStorage.setItem(Application.SESSION.TC_KIMLIK_NO, JSON.stringify(userU));
    },

}
UYAP_EXT.DB = {
    queue:{
        evrak:{}
    },
    evraklar:[],
    dosya_evrak_bilgileri_brd: async function (request, response) {

        if (response.status < 200 || response.status >= 300) {
            return false;
        }
        UYAP_EXT.DB.evraklar=[]
        let uniquede = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        UYAP_EXT.DB.queue.evrak[uniquede] = new Promise(async (resolve, reject) => {

            UYAP_EXT.DIALOG.blockUILogo.show("Evraklarınız Eşitleniyor", "Lütfen İşlem Bitene Kadar Bekleyiniz", "");

            let _dosyaId = request.body.split("=");


            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(response.text.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, ""), "text/html");
            let all_files = xmlDoc.querySelectorAll('#browser>li>ul>li:last-of-type span.file');
            if (all_files.length <= 0) {
                resolve({
                    result: true
                });
            }



            all_files.forEach(
                function (currentValue, currentIndex, listObj) {
                    let yuzde = currentIndex != 0 ? currentIndex * 100 / listObj.length : 0;

                    document.getElementById("dialog_son").innerText = "Evraklarınız Alınıyor";
                    document.getElementById("dialog_yuzde_son").innerHTML = " ( " + Math.round(yuzde) + "% )"
                    let kayit = {};
                    if (currentValue.hasAttribute('title')) {
                        let kayitHam = currentValue.getAttribute('title').replaceAll("<\/div>", "").replace("<div>", "").split("<div>");
                        kayit.birimEvrakNo = parseInt(kayitHam[0].split(":")[1].trim());

                        kayit.onayTarihi = new Date(kayitHam[1].split(":")[1].trim().split("/").reverse().toString());
                        kayit.gonderenYer = kayitHam[2].split(":")[1].trim();
                        kayit.gonderenDosya = kayitHam[3].split(":")[1].trim();
                        kayit.gonderenSayi = kayitHam[4].split(":")[1].trim();
                        kayit.sistemTarihi = new Date(kayitHam[5].split(":")[1].trim().split("/").reverse().toString());
                        kayit.aciklama = kayitHam[6].split(":")[1].trim();
                        kayit.turu = kayitHam[7].split(":")[1].trim();
                        kayit.tipi = kayitHam[8].split(":")[1].trim();
                        kayit.evrakId = parseInt(currentValue.getAttribute("evrak_id"));
                        kayit.dosyaId = parseInt(_dosyaId[1]);
                        kayit.md5 = "evraklar" + kayit.dosyaId.toString() + kayit.evrakId.toString()

                    } else {


                        kayit.evrakId = parseInt(currentValue.getAttribute("evrak_id"));
                        kayit.anaevrakId = parseInt(currentValue.getAttribute("ana_evrak_id"));
                        kayit.dosyaId = parseInt(_dosyaId[1]);
                        kayit.md5 = "evraklar" + kayit.dosyaId.toString() + kayit.anaevrakId.toString() + kayit.evrakId.toString()

                    }
                    UYAP_EXT.DB.evraklar.push(kayit);


                }
            );
            UYAP_EXT.DB.evraklar.map(o => {
                if (o.anaevrakId != null) {
                    let sonuc = UYAP_EXT.DB.evraklar.find(k => k.evrakId == o.anaevrakId);
                    o.onayTarihi = sonuc.onayTarihi;
                    return o;
                }
            });



                UYAP_EXT.DIALOG.blockUILogo.hide();



            resolve({
                result: true
            });


        }).then(() => {
            window.downloadDocURL = async function (url, values) {
                let filename = null;
                if (!values.filename) {

                    var evrak;
                    for (let index = 0; index < UYAP_EXT.DB.evraklar.length; index++) {
                        if(UYAP_EXT.DB.evraklar[index].evrakId==values.evrakId){
                            evrak=UYAP_EXT.DB.evraklar[index];
                            break;
                        }
                    }
                    if (evrak.anaevrakId) {
                        let anaevrak;
                        for (let index = 0; index < UYAP_EXT.DB.evraklar.length; index++) {
                            if(evrak.anaevrakId==UYAP_EXT.DB.evraklar.evrakId){
                                anaevrak=UYAP_EXT.DB.evraklar[index];
                                break;
                            }
                        }
                        filename =Application.SESSION.adiSoyadi+" - "+ dosya_bilgileri.birimAdi + "-" + dosya_bilgileri.dosyaNo + " -" + " EK ( " + (evrak.onayTarihi instanceof Date && !isNaN(evrak.onayTarihi) ? evrak.onayTarihi.toLocaleDateString('tr-TR') : new Date().toLocaleDateString('tr-TR')) + " )";
                    } else {
                        filename = Application.SESSION.adiSoyadi+" - "+ dosya_bilgileri.birimAdi +"-"+ dosya_bilgileri.dosyaNo + " - " + evrak.turu + "( " + (evrak.onayTarihi instanceof Date && !isNaN(evrak.onayTarihi) ? evrak.onayTarihi.toLocaleDateString('tr-TR') : new Date().toLocaleDateString('tr-TR')) + " )";
                    }



                } else {
                    filename = values.filename;
                }
                values = values ? values : {};

                //If in Chrome or Safari - download via virtual link click
                if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
                    UYAP_EXT.DIALOG.blockUILogo.show(dosya_bilgileri.birimAdi + " " + (dosya_bilgileri.esasNo ? dosya_bilgileri.esasNo + " E." : dosya_bilgileri.dosyaNo ? dosya_bilgileri.dosyaNo + " E. " : ""), "Seçtiğiniz Evraklar İndiriliyor", "Lütfen İşlem Bitene Kadar Bekleyiniz", "body", false, true)
                    var params = Application.convertObjectToURLParameters(values);
                    let saw = await UYAP_EXT.TOOL.makeRequest(url, params, 200, "application/download", function (progress) {
                        document.getElementById("dialog_yuzde_son").innerHTML = " ( " + (progress.loaded / (1024 * 1024)).toFixed(2) + "MB )"
                    }).promise;
                    if (saw.success == false) {
                        let islemeDevam = `<p><strong>İndirme İşlemi Esnasında Sorun Oluştu.</strong>
                                         <br>
                                         <br>
                                         Bu problem genellikle büyük dosyalarda UYAP sisteminin iletişimi kesmesinden kaynaklanmaktadır.
                                         <br>
                                         <br>
                                         <u>Tekrar denemek ister misiniz?</u>
                                         <br>
                                         </p>`
                        let tmm = document.createElement('div');
                        tmm.innerText = 'Evet';
                        tmm.className = "button positive";
                        tmm.onfunc = async function (params) {
                            document.querySelector("input[name=dialog_state]").click();
                            return true;
                        }
                        let hyr = document.createElement('div');
                        hyr.innerText = 'Hayır';
                        hyr.className = "button";
                        hyr.onfunc = async function (params) {
                            document.querySelector("input[name=dialog_state]").click();
                            return false;
                        }
                        let center = {
                            mesaj: islemeDevam,
                            buttons: [hyr, tmm],

                        }
                        if (await UYAP_EXT.DIALOG.user_dialog.show(center)) {
                            UYAP_EXT.DIALOG.blockUILogo.hide();
                            UYAP_EXT.TOOL.fileDownload(values.evrakId, values.dosyaId, values.yargiTuru);
                        }
                        UYAP_EXT.DIALOG.blockUILogo.hide();


                        return false;
                    }
                    //Create a link element, hide it, direct
                    //it towards the blob, and then 'click' it programatically
                    let a = document.createElement("a");
                    a.style = "display: none";
                    document.body.appendChild(a);
                    //Create a DOMString representing the blob
                    //and point the link element towards it
                    let uri = window.URL.createObjectURL(saw.xhr.response);
                    a.href = uri;
                    let ext;
                    try {
                        if (filename == null) {
                            filename = "evrak_" + values.evrakId;
                        }
                        ext = saw.xhr.getResponseHeader("content-disposition").match(/\.(.*)$/);
                        a.download = (filename + ext[0]).normalize(UYAP_EXT.TOOL.systemInformation.fileNameEncoding);
                    } catch (error) {
                        try {
                            a.download = (filename + "." + saw.xhr.response.type.split("/")[1]).normalize(UYAP_EXT.TOOL.systemInformation.fileNameEncoding);
                        } catch (error) {
                            a.download = filename.normalize(UYAP_EXT.TOOL.systemInformation.fileNameEncoding)
                        }

                    }


                    //programatically click the link to trigger the download
                    a.click();
                    //release the reference to the file by revoking the Object URL
                    window.URL.revokeObjectURL(uri);
                    document.body.removeChild(a);
                    UYAP_EXT.DIALOG.blockUILogo.hide();

                } else {
                    // Force file download (whether supported by server).
                    postToURL_target(url, values, 'width=400,height=10,resizable=yes');
                    UYAP_EXT.DIALOG.blockUILogo.hide();
                }


            }
            let _divButtons = document.createElement("div");

            let _button_FileList = document.createElement("button");
            _button_FileList.classList.add("btn", "btn-warning", "btn-sm");
            _button_FileList.innerHTML = '<i class="fas fa-list"></i>';
            _button_FileList.style.bottom = "13px";
            _button_FileList.onclick = function (e) {

                UYAP_EXT.DIALOG.openEvrakList.default("evraklar", dosya_bilgileri.tabledosya, dosya_bilgileri.dosyaId, this);
            }
            _divButtons.append(_button_FileList);
            $("#onizleme").after(_divButtons);
            delete UYAP_EXT.DB.queue.evrak[uniquede];
        })
    },
}
