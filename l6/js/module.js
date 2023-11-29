export class MasonryListElement{
    Position = -1;
    Width = 0;
    Height = 0;
    Content = "...";
}

export class MasonryShower{
    classMasonryList = "it2";

    btn_formEdit_name = "li-fbtn-fedit";
    btn_formAdd_name = "li-fbtn-fadd";

    formEdit_name = "li-fedit";
    formEdit_btnRemove = "li-fedit-btn-remove";
    formEdit_btnConfirm = "li-fedit-btn-confirm";
    formEdit_fieldWidth = "li-form-width";
    formEdit_fieldHeight = "li-form-height";
    formEdit_fieldContent = "li-form-content";
    formEdit_fieldPosition = "li-form-position";

    htmlBtn_formAdd = `
    <button class="${this.btn_formAdd_name}">
        +
    </button>`;

    htmlBtn_formEdit = `
    <button class="${this.btn_formEdit_name}">
        ✎
    </button>`;

    mle = new MasonryListElement();
    list = [];
    constructor(list){
        this.list = list;
    }

    showInitialList(){
        this.showListOfMasonryElems(0, this.list.length);
        this.showHelpInfo();
        this.showButtonAdd();
        this.addListenerToButtonAdd();
        this.addListenerToBtnsFormEdit();
        this.showMasonry();
    }

    showHelpInfo(){
        let div = document.getElementsByClassName(this.classMasonryList)[0];
        let newElement = document.createElement('span');
        newElement.textContent = 'Ш Х В: вміст';
        let span = div.querySelector('span');
        let nextElement = span.nextSibling;
        div.insertBefore(newElement, nextElement);
    }

    showListOfMasonryElems(istart, iend, isEditBtnShown=true, isHeaderShown=true){
        if (istart > iend-1 && this.list.length != 0) return;
        let item = document.getElementsByClassName(this.classMasonryList)[0]
        if (isHeaderShown){
            item.innerHTML += 
            `<span>
                Налаштування макету:
            </span>
            `
        }
        if (this.list.length == 0){
            item.innerHTML += 
                "Макет пустий";
        }
        else{
            let innerHTML = "<ul>";
            for (let i=istart; i<iend; i++){
                innerHTML += `
                <li>
                    <div class="medit-info">
                        <span class="medit-info-pos">
                            ${i+1}.
                        </span>    
                        <span class="medit-info-size">
                            ${this.list[i].Width}x${this.list[i].Height}
                        </span>
                `
                //#region edit button
                if (isEditBtnShown) {
                    innerHTML += this.htmlBtn_formEdit;
                }
                //#endregion
                innerHTML += `
                    </div>
                    <div class="medit-content">
                        ${this.list[i].Content}
                    </div>
                </li>
                `
            }
            innerHTML += "</ul>";
            item.innerHTML += innerHTML;
        }
    }

    showButtonAdd(){
        let item = document.getElementsByClassName(this.classMasonryList)[0];
        item.innerHTML += this.htmlBtn_formAdd;
    }

    showElementEdit(maxIndex, index, mle=null){
        let block = document.getElementsByClassName(this.classMasonryList)[0];
        if (mle === null){
            mle = new MasonryListElement();
            mle.Position = index + 1;
            mle.Width = 1;
            mle.Height = 1;
            mle.Content = "...";
        }
        //make form list item
        block.innerHTML += `
        <form name="${this.formEdit_name}" class="medit-form">
        <div>
            <input type="number" min="1" max="${maxIndex+1}" 
                name="${this.formEdit_fieldPosition}" class="medit-form-pos" value="${mle.Position}" required>
            <span>.</span>
            <input type="number" min="1" max="4" 
            name="${this.formEdit_fieldWidth}" class="medit-form-size" value="${mle.Width}" required>
            <span class="medit-form-size-delim">x</span>
            <input type="number" min="1" max="4" 
                name="${this.formEdit_fieldHeight}" class="medit-form-size" value="${mle.Height}" required>
        </div>
        <input type="text" maxlength="50" name="${this.formEdit_fieldContent}" 
        class="medit-form-content" value="${mle.Content}">
        <input type="submit" name="${this.formEdit_btnConfirm}" class="medit-form-btnv" value="✔">
        <button type="button" name="${this.formEdit_btnRemove}" class="medit-form-btnx">🗑</button>
        </form>
        `
    }

    clearList(){
        let item = document.getElementsByClassName(this.classMasonryList)[0]
        item.innerHTML = null;    
    }

    addListenerToButtonAdd(){
        let btn = document.getElementsByClassName(this.btn_formAdd_name)[0];
        btn.addEventListener("click", (event)=>{
            this.clearList();
            this.showListOfMasonryElems(0, this.list.length, false);
            this.showElementEdit(this.list.length, this.list.length);
            this.addListenerToFormEditSubmit();
            this.addListenerToFormEditRemove();
        })
    }

    addListenerToFormEditSubmit(oldIndex=null){
        let form = document.forms[this.formEdit_name];
        form.addEventListener("submit", (event)=>{
            event.preventDefault();
            let mle = new MasonryListElement();
            mle.Position = form.elements[this.formEdit_fieldPosition].value - 1;
            mle.Width = form.elements[this.formEdit_fieldWidth].value;
            mle.Height = form.elements[this.formEdit_fieldHeight].value;
            mle.Content = form.elements[this.formEdit_fieldContent].value;
            if (Number.isInteger(oldIndex)){
                this.list.splice(oldIndex, 1);
            }
            this.list.splice(mle.Position, 0, mle);
            this.updateListElementsPosition();
            this.clearList();
            this.showInitialList();
            this.pushDataToServer();
        })
    }

    updateListElementsPosition(){
        for (let i = 0; i < this.list.length; i++){
            this.list[i].Position = i+1;
        }
    }
    addListenerToFormEditRemove(index=null){
        let form = document.forms[this.formEdit_name];
        form.elements[this.formEdit_btnRemove].addEventListener("click", ()=>{
            if (index !== null && index < this.list.length){
                this.list.splice(index, 1);
                this.updateListElementsPosition();
                this.pushDataToServer();
            }
            console.log("click");
            this.clearList();
            this.showInitialList();
        })
    }

    addListenerToBtnsFormEdit(){
        let btns = document.getElementsByClassName(this.btn_formEdit_name);
        for (let i = 0; i<btns.length; i++){
            btns[i].addEventListener("click", ()=>{
                this.clearList();
                this.showListOfMasonryElems(0, i, false);
                this.showElementEdit(this.list.length - 1, i, this.list[i])
                this.showListOfMasonryElems(i + 1, this.list.length, false, false);
                this.addListenerToFormEditSubmit(i);
                this.addListenerToFormEditRemove(i);
            })
        }
    }

    showMasonry(){
        let container = document.getElementsByClassName("it3")[0];
        if (this.list.length == 0){
            container.innerHTML = "<span>Елементів немає</span>";
            return;
        }
        let addedHtml = "", curw, curh;
        let resHtml = `<div class="masonry">`;
        this.list.forEach((el)=>{
            addedHtml = `
            <div class="me ">
                ${el.Content}
            </div>`
            curw = parseInt(el.Width);
            curh = parseInt(el.Height);
            if (curw > 1){
                addedHtml = addedHtml.replace("me ", `me me-width${curw} `);
            }
            if (curh > 1){
                addedHtml = addedHtml.replace("me ", `me me-height${curh} `);
            }
            resHtml += addedHtml;
        })
        resHtml += `</div>`;
        container.innerHTML = resHtml;
    }

    pushDataToServer(){
        let formData = new FormData();
        formData.append("data", JSON.stringify(this.list));

        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'server.php?q=1', true);
        xhr.send(formData);
        xhr.onloadend = () => {
            console.log(xhr.response)
        };
        console.log("sending to server");
    }
};