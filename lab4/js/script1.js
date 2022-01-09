
var adddiv = document.querySelector('.add');

function divarr(divs){
    return Array.prototype.slice.call(divs);

}

adddiv.addEventListener('click', function() {
let divid = document.getElementById('maindiv');
let list = divid.querySelectorAll('div');
console.log(list)

for (let i = 0; i < list.length; i++)
{
if (i%2==0){
    let newdiv = document.createElement('div');
    newdiv.innerHTML = 'NEW DIV';
    list[i].appendChild(newdiv);
}

}

});