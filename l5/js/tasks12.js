//task 1
let x = document.getElementsByTagName("h1")[0];
let y = document.getElementsByTagName("h2")[0];
let tmp = y.innerHTML;
y.innerHTML = x.innerHTML;
x.innerHTML = tmp;

//task 2
function getAreaTrapeze(base1, base2, heigth){
    area = (base1 + base2) * heigth / 2;
    return area;
}

const trapezeBase1 = 4;
const trapezeBase2 = 5;
const trapezeHeight = 6;
item = document.getElementsByClassName("it3")[0];
item.innerHTML += `
<span>
    Площа трапеції: ${getAreaTrapeze(trapezeBase1, trapezeBase2, trapezeHeight)}
</span>
`