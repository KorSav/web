const classBtnRemove = "li-remove";
const classBtnAdd = "li-add";
const formName = "li-add";

const listFormHTML = `
<form name="${formName}">
    <input type="text" name="text" 
        placeholder="Додати елемент">
    <button type="submit" name="${classBtnAdd}">➕</button>
</form>`;

function listItemHTML(text, addButton=true){
    let btn = ""
    if (addButton)
        btn = `
        <button class="${classBtnRemove}">
            ➖
        </button>`
    return `
    <div>
        <li>
            ${text}
        </li>
        ${btn}
    </div>`;
} 

for (let item of document.getElementsByClassName("ol-link")){
    let itemClass = item.parentNode.className;
    item.addEventListener("focus", ()=>initList(itemClass));
}

function localStorageGetArray(key){
    res = JSON.parse(localStorage.getItem(key));
    if (res === null || res.length == 0) return [];
    return res;
}

function localStorageSetArray(key, value){
    localStorage.setItem(
        key, JSON.stringify(value) 
        );
}

function listItemArrayHTML(items){
    let res = "";
    for (let it of items){
        res += listItemHTML(it);
    }
    return res;
}

function addItem(className, item){
    if (item == "") return false;
    let elements = localStorageGetArray(className);
    elements.push(item);
    if (elements.length == 0) return false;
    localStorageSetArray(className, elements);
    return true;
}

function removeItem(className, index){
    let items = localStorageGetArray(className);
    let resItems = [];
    for (let i = 0; i < items.length; i++){
        if (i != index) resItems.push(items[i]);
    }
    localStorageSetArray(className, resItems);
}

function initList(className){
    showList(className);
    initBtnsRemove(className);
    initForm(className);
}

function showList(className){
    let block = document.getElementsByClassName(
        className.replace("item ", "") )[0];
    block.innerHTML = `
    <ol>
        ${listItemArrayHTML(localStorageGetArray(className))}
        ${listItemHTML(listFormHTML, false)}
    </ol>    
    `
}

function initBtnsRemove(className){
    for (let btn of document
        .getElementsByClassName(classBtnRemove)){
        let curNode = btn.parentNode;
        let index = 0;
        while (curNode = curNode.previousElementSibling){
            index++;
        }
        btn.addEventListener("click", ()=>{
            removeItem(className, index);
            initList(className);
        });
    }
}

function initForm(className){
    for (let form of document.forms){
        if (form.name != formName) continue;
        form.addEventListener( "submit", (event)=>{
            event.preventDefault();
            let isAdded = addItem(className, event.target.elements
                .text.value.trim());
            if ( !isAdded ){
                alert("Введіть дані");
                return;
            }
            initList(className);
        })
    };
}