let mainTabs=[];
let user;
function check() {
    chrome.storage.local.get(null, (res) => {
        blockUILogo.show();
        mainTabs=res.tabs.main;
        if(res.tabs.main.length>0 && res[res.active_user]){
            chrome.runtime.sendMessage({
                ask: "uyelik",
                params: {
                    avukat_id: res.active_user,
                    unique_id: res[res.active_user].response?res[res.active_user].response.uyap_unique_id:null
                },
            }, function (response) {
                user=res[res.active_user];
                res[res.active_user].response=response.kullanimHakki;
                document.querySelector(".uyeid").innerText = response.kullanimHakki.imerek_avukat_id;
                document.querySelector(".adsoyad").innerText = res[res.active_user].avukat_adi+" "+res[res.active_user].avukat_soyadi;
                document.querySelector(".uyeturu").innerText = response.kullanimHakki.uyap_type.indexOf("ucretli") >= 0 ? "Ücretli" :response.kullanimHakki.uyap_type.indexOf("ucretsiz") >= 0 ? "Ücretsiz":"Ödeme Bekleniyor";
                document.querySelector("._csa").innerText = response.cSa;
                document.querySelector(".sistemdurumu").innerText =res[res.active_user].options.extensionStatus?"Uyap Avukat Yardımcınız ÇALIŞIYOR":"Uyap Avukat Yardımcınız DURAKLATILDI!"
                if(res[res.active_user].options.extensionStatus){
                    document.querySelector(".playpause").classList.add("active");
                    document.querySelector(".sistemdurumu").style.color="green";
                }
                let fr = response.kullanimHakki.uyap_type === 'ucretli' ? new Date(response.kullanimHakki.uyap_Ucretli_Son.date) : new Date(response.kullanimHakki.uyap_Ucretsiz_Son.date);
                let sonKullanim = fr.toLocaleDateString("tr-TR");
                document.querySelector(".sonkullanim").innerText = sonKullanim;
                document.querySelector("table").style.display="unset";
                blockUILogo.hide();
            });
        }else{
            document.getElementById("nonAktifOturum").style.display="block";
            blockUILogo.hide();
        }

    })
}
var blockUILogo= {
    container: document.createElement("div"),
        show: function () {
            this.hide();
            blockUILogo.container.classList.add("UYP_block");
            blockUILogo.container.innerHTML = '<div>' +
                '<div class="lds-dual-ring"><img style="width:34px;align-self:center;" src="chrome-extension://hlgcdafdokigonljodongahofoeaedjk/style/img/logo.png" /></div>' +
                '<div>';
            $("body").append($(this.container).css("display", "flex").hide().fadeIn(100));
    },
    hide: function () {
        $(this.container).remove();

    }
}
document.addEventListener('DOMContentLoaded', async function () {
document.querySelector(".playpause").addEventListener("click",(a)=>{
    if(a.currentTarget.classList.contains("active")){
        user.options.extensionStatus=false;
        for (let index = 0; index < mainTabs.length; index++) {
            chrome.tabs.sendMessage(mainTabs[index].id, {ask: "disableExtension"});
        }
        a.currentTarget.classList.remove("active");
        document.querySelector(".sistemdurumu").style.color="#ff0000";
    }else{
        user.options.extensionStatus=true;
        for (let index = 0; index < mainTabs.length; index++) {
            chrome.tabs.sendMessage(mainTabs[index].id, {ask: "enableExtension"});
        }
        a.currentTarget.classList.add("active");
        document.querySelector(".sistemdurumu").style.color="green";
    }
    document.querySelector(".sistemdurumu").innerText =user.options.extensionStatus?"Uyap Avukat Yardımcınız ÇALIŞIYOR":"Uyap Avukat Yardımcınız DURAKLATILDI!"

})
    check();

});