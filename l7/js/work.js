const htmlBtnStart = `<button class="btn-change">Start</button>`
const htmlBtnStop = `<button class="btn-change">Stop</button>`
const htmlBtnReload = `<button class="btn-change">Reload</button>`


let circleX;
let circleY = null;
let angle;
let circleOpacity;
let intervalID = null;
let animPlace;
let animWidth;
let animHeight;
let eventNumber = 0;

initBtnPlay();


function getBtnStart() {
    let btn = document.createElement('button');
    btn.className = "btn-change";
    btn.innerHTML = "Start";
    btn.onclick = () => {
        saveEvent("btn start");
        startAnim();
        initBtnStop();
    };
    return btn;
}

function getBtnStop() {
    let btn = document.createElement('button');
    btn.className = "btn-change";
    btn.innerHTML = "Stop";
    btn.onclick = () => {
        saveEvent("btn stop");
        stopAnim();
        initBtnStart();
    };
    return btn;
}

function getBtnReload() {
    let btn = document.createElement('button');
    btn.className = "btn-change";
    btn.innerHTML = "Reload";
    btn.onclick = () => {
        saveEvent("btn reload");
        initBtnStart();
        initCircle();
        drawCircle();
    };
    return btn;
}

function initBtnPlay(){
    let block = document.getElementsByClassName("it5")[0];
    block.innerHTML = `<button name="BtnPlay">Анімація</button>`;
    let btnPlay = document.getElementsByName("BtnPlay")[0];
    btnPlay.onclick = initWorkPlace;
}

function hideBtnPlay(){
    let block = document.getElementsByClassName("it5")[0];
    block.innerHTML = '';
}

function initWorkPlace() {
    hideBtnPlay();
    let workPlace = document.createElement("div");
    workPlace.className = "work";
    workPlace.innerHTML = `
    <div class="controls">
        <div class="box-mes"></div>
        <div class="box-btns">
            ${htmlBtnStart}
            <button name="BtnClose">Close</button>
        </div>
    </div>
    <div class="anim"></div>
    `
    let body = document.getElementsByTagName("body")[0];
    body.insertBefore(workPlace, body.childNodes[0]);
    animPlace = document.getElementsByClassName("anim")[0];
    animWidth = animPlace.clientWidth;
    animHeight = animPlace.clientHeight;
    initBtnStart();
    initBtnClose();
    initCircle();
    drawCircle();
    localStorage.clear();
    clearServer();
    showLocalStorage();
}

function initBtnStart() {
    let btn = document.getElementsByClassName("btn-change")[0];
    let newBtn = getBtnStart();
    btn.replaceWith(newBtn);
}

function initBtnStop() {
    let btn = document.getElementsByClassName("btn-change")[0];
    let newBtn = getBtnStop();
    btn.replaceWith(newBtn);
}

function initBtnReload() {
    let btn = document.getElementsByClassName("btn-change")[0];
    let newBtn = getBtnReload();
    btn.replaceWith(newBtn);
}

function initBtnClose() {
    let btnClose = document.getElementsByName("BtnClose")[0];
    btnClose.onclick = closeWorkPlace;
}

function closeWorkPlace() {
    let body = document.getElementsByTagName("body")[0];
    body.removeChild(body.children[0]);
    stopAnim();
    saveEvent("work close");
    showLocalStorage();
    saveMultiple(localStorage.getItem("save"));
    eventNumber = 0;
    initBtnPlay();
}

function initCircle() {
    circleX = Math.random() * 100;
    circleY = 0;
    angle = randint(10, 170)
    circleOpacity = 100;
}

function startAnim() {
    if (circleY === null) initCircle();
    intervalID = setInterval(animate, 1);
    saveEvent('anim start');
}

function drawCircle() {
    if (circleOpacity <= 0) {
        animPlace.innerHTML = "";
        return;
    }
    let x = circleX * (animWidth - 30) / animWidth / 10;
    let y = 100 - circleY * (animHeight - 30) / animHeight / 10;
    animPlace.innerHTML = `
    <div class="circle" style="top: calc(${y}% - 30px); 
    left: ${x}%; opacity: ${circleOpacity / 100}"></div>
    `;
}

function animate() {
    drawCircle();
    moveCircle();
    if (circleOpacity <= 0) {
        stopAnim();
        circleY = null;
        return;
    }
    if (circleOpacity < 100) {
        circleOpacity -= 2;
        return;
    }
    if (circleX < 0) {
        saveEvent('circle bump');
        if (getAngleQuarter() == 3) angle = -angle - 180;
        else angle = -angle + 180;
    }
    else if (circleX > 1000) {
        saveEvent('circle bump');
        if (getAngleQuarter() == 1) angle = -angle - 180;
        else angle = -angle + 180;
    }
    else if (circleY < 0) {
        saveEvent('circle bump');
        if (getAngleQuarter() == 4) angle = -angle - 180;
        else angle = -angle + 180;
    }
    else if (circleY > 1000) {
        saveEvent('circle bump');
        circleOpacity = 99;
        initBtnReload();
    }
}

function moveCircle() {
    let rad = angle * Math.PI / 180;
    circleX += Math.cos(rad) * 5;
    circleY += Math.sin(rad) * 5;
    saveEvent('circle move')
}

function getAngleQuarter() {
    if (angle === 0) return 1;
    return 1 + Math.floor(angle / 90) % 4;
}

function stopAnim() {
    if (intervalID === null) return;
    clearInterval(intervalID);
    intervalID = null;
    saveEvent('anim stop');
}

function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveEvent(description) {
    eventNumber++;
    let time = Date.now();
    let messageBox = document.getElementsByClassName("box-mes")[0];
    if (messageBox !== undefined) {
        messageBox.innerHTML = `
        ${eventNumber}. ${description}: ${time}
        `;
    }
    let oldJson = JSON.parse(window.localStorage.getItem("save"));
    if (oldJson === null) {
        window.localStorage.setItem("save",
            JSON.stringify([[eventNumber, description, time]]));
    } else {
        oldJson.push([eventNumber, description, time]);
        window.localStorage.setItem("save",
            JSON.stringify(oldJson));
    }
    saveSingle(JSON.stringify([eventNumber, description]));
}

function showLocalStorage() {
    let tbody = document.querySelector('#lsTable tbody');
    tbody.innerHTML = "";
    let list = JSON.parse(localStorage.getItem("save"));
    if (list === null) {
        return;
    }
    for (let i = 0; i < list.length; i++) {
        let row = document.createElement('tr');
        let cnt = 1;
        for (let prop in list[i]) {
            let cell = document.createElement('td');
            cell.className = `tbl-col${cnt++}`;
            cell.innerHTML = `
                <div>
                    ${list[i][prop]}
                </div>
            `;
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
}

function clearServer() {
    fetch("../server.php", {
        method: 'POST',
        body: new URLSearchParams({
            "type": "clear"
        })
    })
        .then(response => {
            let txt = response.text();
            if (!response.ok) {
                console.log(txt);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function saveSingle(json) {
    save("single", json);
}

function saveMultiple(json){
    save("multiple", json);
}

function save(method, json){
    fetch("../server.php", {
        method: 'POST',
        body: new URLSearchParams({
            "type": method,
            "data": json
        })
    })
        .then(response => {
            let txt = response.text();
            if (!response.ok) {
                console.log(txt);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}