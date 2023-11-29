import * as module from './module.js';

function updateMasonryFromServer(){
    console.log("updating...");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        // the request was sent and response was got
        if (this.readyState == this.DONE){
            console.log("updating end");
            if (this.status == 200){
                let mleList = JSON.parse(this.responseText);
                console.log(mleList);
                let ms = new module.MasonryShower(mleList);
                ms.showMasonry();
            }
            else if (this.status == 400){
                console.log("Server request failed: " + this.responseText);
            }
        } 
    };
    xmlhttp.open("GET", "server.php/?q=data", true);
    xmlhttp.send();
}

let lastModificationTime = "";
function fetchFileModification(){
    console.log("checking changes...");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        // the request was sent and response was got
        if (this.readyState == this.DONE){
            if (this.status == 200){
                let newTime = this.responseText;
                if (lastModificationTime !== newTime){
                    updateMasonryFromServer();
                }
                lastModificationTime = newTime;
            }
            else if (this.status == 400){
                console.log("Server request failed: " + this.responseText);
            }
        } 
    };
    xmlhttp.open("GET", "server.php/?q=time", true);
    xmlhttp.send();
}

window.onload = fetchFileModification;
setInterval(fetchFileModification, 1000);