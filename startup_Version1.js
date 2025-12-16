
function startUp(){

    return true;

}
if(startUp()){
    new Promise((resolve, reject) => {
        let started=false;
        let dedeff = setTimeout(function () {
            window.location.reload();
        }, 1015000);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/bilirkisi_bilgileri_json.ajx", true);
        xhttp.setRequestHeader("Content-Type", 'application/json');
        xhttp.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xhttp.setRequestHeader('cache-control','no-cache');
        xhttp.setRequestHeader('Expires',"0");
        xhttp.onreadystatechange = function() {
            if ((this.readyState ==4) && this.status == 200 && started==false && xhttp.responseText.length>0) {
                let data=[{}];
                
                try {
                    data=JSON.parse(xhttp.responseText);
                }catch (e) {
                    data[0].bilirkisiID=parseInt(/"bilirkisiID":(.*?),/g.exec(xhttp.responseText)[1]);
                    data[0].ad= /"ad":"(.*?)",/g.exec(xhttp.responseText)[1];
                    data[0].soyad= /"soyadi":"(.*?)",/g.exec(xhttp.responseText)[1];
                    data[0].calistigiKurum= /"calistigiKurum":"(.*?)",/g.exec(xhttp.responseText)[1];
                    data[0].uzmanlikAlani= /"uzmanlikAlani":"(.*?)",/g.exec(xhttp.responseText)[1];

                }
                resolve(data.bilirkisiBasvuruDVO);

            }
        };
        xhttp.send("{}");
    }).then(kimlik => {
        const channel = new MessageChannel();
        channel.port1.onmessage = ({data}) => {
            channel.port1.close();
            //VERSION cevaba göre hareket edebilirsin
        };
        if (typeof window.UYAP_EXT == "undefined") {
            window.UYAP_EXT = {
                GENEL:{
                    kimlikBilgileri:kimlik
                }
            };
        }else{
            UYAP_EXT.GENEL={
                kimlikBilgileri:kimlik
            }
        }
        window.postMessage({ask:"startup",params:kimlik},"*", [channel.port2]);

    });
}

