let radioBtns = document.getElementsByName("alignment");
for (let radioBtn of radioBtns){
    radioBtn.addEventListener("change", function(){
        if (this.checked){
            localStorage.setItem("alignment", this.value);
            let itemClassNames = ["it2", "it3", "it4"];
            for (let itemClassName of itemClassNames){
                item = document.getElementsByClassName(itemClassName)[0];
                for (let child of item.children){
                    childStyle = `text-align: ${this.value};`;
                    if (this.value == 'left') childStyle += "align-self: baseline";
                    else if (this.value == 'center') childStyle += "align-self: center"; 
                    else if (this.value == 'right') childStyle += "align-self: end";
                    child.style = childStyle;
                }
            }
        }
    })
}
function windowOnloadTask4(){
    alignment = localStorage.getItem("alignment");
    if (alignment == "") return;
    for (let el of document.getElementsByName("alignment")){
        if (el.value == alignment){
            el.checked = true;
        }
        el.dispatchEvent(new Event('change'));
    }
}