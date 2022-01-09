
let arrayOfObjects = [];
let index = 0;
let object = {};

function OpenResult() {

    let result = [];
    for (let j = 0; j < index; j++) {
        result[j] = arrayOfObjects[j].name + " " +
            arrayOfObjects[j].radioSex + " " +
            arrayOfObjects[j].date + " " +
            arrayOfObjects[j].email + " " +
            arrayOfObjects[j].color + " " +

            arrayOfObjects[j].type + " " +
            arrayOfObjects[j].otzyv  ;
        /*                   arrayOfObjects[j].extra;*/
    }

    result = result.join(";");

    window.open('index2.html?&' + result);
    //window.open('results.html');
    // window.location.href = 'results.html?';
}

function Submit() {


    let sex = document.getElementsByName('sex');
    let sexValue = " ";
    for (let i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            sexValue = sex[i].value;
        }
    }

    if (sexValue === " " || document.getElementById("name").value === "" ||  document.getElementById("data").value === ""
        || document.getElementById("color").value === "" || document.getElementById("type").value === "" || document.getElementById("otzyv").value === "") {
        alert("Не все обязательные поля заполнены");
    } else {

        object =
            {
                name: document.getElementById("name").value,
                radioSex: sexValue,
                date: document.getElementById("date").value,
                email: document.getElementById("email").value,
                color: document.getElementById("color").value,
                
                type: document.getElementById("type").value,
                otzyv: document.getElementById("otzyv").value,
                /*                        extra: document.getElementById("extra").value*/
            };
        arrayOfObjects[index] = object;
        index++;

        alert("Данные добавлены!");
    }
}