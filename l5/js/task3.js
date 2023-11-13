const cookieNumberName = "number";
const formNumberName = "number";
function setCookie(name, value){
    const d = new Date();
    d.setTime(d.getTime() + (60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(name){
    let cookie = document.cookie;
    let pairs = cookie.split(";");
    let result = ""
    for (const pair of pairs) {
        if ( ! pair.startsWith(name)){
            continue;
        }
        result = pair.replace(name+"=", "");
        break;
    }
    return result;
}
function reverseNumber(number){
    let reversed = parseInt(String(number).split('').reverse().join(''));
    return reversed;
}
function windowOnloadTask3(){
    let number = getCookie(cookieNumberName);
    let strCookieResult = "";
    let confirmRes = false;
    if (number != ""){
        document.forms[formNumberName].hidden = true;
        confirmRes = confirm("Зберегти дані з cookie?\n" +
        `Перевернуте натуральне число = ${number}`) 
        strCookieResult = ``;
    }
    if (confirmRes){
        alert("Cookie наявні, перезавантажте сторінку");
        return;
    }
    document.forms[formNumberName].hidden = false;
    document.cookie = cookieNumberName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
document.forms[formNumberName].addEventListener("submit", function(event){
    event.preventDefault();
    let number = document.forms[formNumberName]["num"].value;
    let rnumber = reverseNumber(number);
    alert(`Перевернуте натуральне число = ${rnumber}`)
    setCookie(cookieNumberName, rnumber);
})