
add1 = document.getElementById("add1");
add2 = document.getElementById("add2");

addBtn = document.getElementById("btn");

infoaboutadded = document.getElementById("iad");

/*
recountBtn = document.getElementById("recountBtn");
*/
deleteFirst = document.getElementById("deleteFirst");
deleteLast = document.getElementById("deleteLast");

down = document.getElementById("down");
left = document.getElementById("left");

table = document.getElementById("table");
tr = document.querySelector("tr");


let cntRow = 0;
let cntCol = 0;

document.getElementById("colCounter").innerHTML = cntCol;
document.getElementById("rowCounter").innerHTML = cntRow;




//let slowo  = word.options[word.selectedIndex].text;

let slowo = word.value;


/*
select.addEventListener('change', function()    {
    slowo =  word.options[word.selectedIndex].text;
}
*/

/*
select.onchange = () => {
    slowo =  word.options[word.selectedIndex].text;

}
/*
if (slowo == 'Ячейка'){

    alert( 'wd' +  slowo)     
    
}
*/

getid = function(){

aidi = word.id;
}

getword = function()
{
    slowo = word.value;
}

addBtn.onclick = () => {
    debugger;
    if (add1.checked == true) {
        if (down.selected) {
            cntRow++;
            console.log(tr.querySelectorAll("td").length);
            let row = table.insertRow(table.rows.length);

            for (let i = 1; i <= tr.querySelectorAll("td").length; i++) {
            //    document.getElementById("rowCounter").innerHTML = cntRow;
                let cell = row.insertCell(0);
                cell.innerHTML =  slowo ;


            }
        } else {
            cntRow++;
            console.log(tr.querySelectorAll("td").length);
            let row = table.insertRow(0);

            for (let i = 1; i <= tr.querySelectorAll("td").length; i++) {
              //  document.getElementById("rowCounter").innerHTML = cntRow;
                let cell = row.insertCell(0);
                cell.innerHTML =  slowo ;

            }
        }

        lng = table.rows.length;
        console.log("Количество строк: " + lng);





        
    } else if (add2.checked == true) {
        if (left.selected) {
            cntCol++;
          //  document.getElementById("colCounter").innerHTML = cntCol;
            let b = 1;
            document.querySelectorAll("tr").forEach(element => {
                let td = document.createElement("td");
                td.innerHTML = slowo;
                //document.getElementById('say').textContent = '';

                element.insertBefore(td, element.firstChild);
            });
        }
        else {
            cntCol++;
         //   document.getElementById("colCounter").innerHTML = cntCol;
            let b = 1;
            document.querySelectorAll("tr").forEach(element => {
                let td = document.createElement("td");
                td.innerHTML = slowo;
                element.appendChild(td);
            });
        }

        // lng = document.querySelectorAll('th').length / 2;
        // console.log("Количество столбцов: " + lng);
    }
    else { }
}

infoaboutadded.onclick = () =>{
              document.getElementById("rowCounter").innerHTML = cntRow;
              document.getElementById("colCounter").innerHTML = cntCol;
}
/*
document.getElementById('btn').onclick = function () {
    document.getElementById('say').textContent = '';
    document.getElementById('say').value = '';
  }
*/

/*
recountBtn.onclick = () => {
    let c = 1;
    document.querySelectorAll("td").forEach(element =>
        element.innerHTML = c++);
}
*/
deleteFirst.onclick = () => {
    if (document.querySelectorAll("tr").length !== 1) {
        document.querySelector("tr").parentNode.removeChild(document.querySelector("tr"));
    } else alert("Нельзя удалить единственную строку!");
}

deleteLast.onclick = () => {
    if (document.querySelectorAll("tr").length !== 1) {
        tbody = document.querySelector("tbody");
        tbody.removeChild(tbody.lastElementChild);
    } else alert("Нельзя удалить единственную строку!");
}
