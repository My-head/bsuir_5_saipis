let dbObject = {};
dbObject.functions = {};
dbObject.data = {};
 
let k = 0;

function Tool(name, man, carnumb, reason) {
    this.name = name;
    this.man = man;
    this.carnumb = carnumb;
    this.reason = reason;
}

let toolSet = new Set();

let isadressSelected ;
let isphonnumbSelected ;
 /*let isSickLeaveSelected;*/

//BD
// on load
dbObject.functions.createBd = function () {
    dbObject.data = openDatabase("TestDB", "1.0", "Tool", 200000);
    dbObject.functions.createToolTable();
    dbObject.functions.getAllToolsFromBdToSet();
};

dbObject.functions.createToolTable = function () {
    dbObject.data.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Tool4 (" +
            "t_id INTEGER PRIMARY KEY AUTOINCREMENT," +
            "t_name varchar(20)," +
            "t_address varchar(20)," +
            "t_telephone varchar(20)," +
            "t_reason varchar(20)" +
            ")", [],
            function () {
                console.log("Table was successfully created !");
            },

            (error) => console.log(error)
        );
    })
};

dbObject.functions.alterTable = function (intValue) {
    if (intValue === 1) {
        dbObject.data.transaction(function (tx) {
            tx.executeSql("ALTER TABLE Tool4 IF NOT EXIST ADD COLUMN diagnosis VARCHAR NOT NULL DEFAULT ''", [],
                function () {
                    console.log("Table was successfully altered !");
                },
                function () {
                    console.log("error alterToolTable!");
                });
        });
    } else if (intValue === 2) {
        dbObject.data.transaction(function (tx) {
            tx.executeSql("ALTER TABLE Tool4 IF NOT EXIST ADD COLUMN doctor VARCHAR NOT NULL DEFAULT ''", [],
                function () {
                    //   alert("Table was successfully created!");
                    console.log("Table was successfully altered !");
                },
                function () {
                    console.log("error alterToolTable!");
                    //  (error) => console.log(error);
                });
        });
    } 
};
// add tool to bd
dbObject.functions.addToolInTableBd = function (tool) {

    identifySelectedProperties();

    dbObject.data.transaction(function (tx) {
            tx.executeSql("INSERT INTO Tool4 (t_name, t_address, t_telephone, t_reason) values (?, ?, ?, ?)",
                [tool.name, tool.man, tool.carnumb, tool.reason],
                function () {
                    
                    console.log("Data successfully inserted ");
                },
                function () {
                    
                    console.log("Data inserting failed!");
                });
        }
    );

    let maxId = 0;


    dbObject.data.transaction(function (tx) {
            tx.executeSql("SELECT MAX(t_id) FROM Tool4",
                [],
                function (tx, resultSet) {
                    maxId = resultSet.rows.item(0)["MAX(t_id)"];

                    console.log("Max id selected succesfully ");
                },
                function () {
                   
                    console.log("Max id selection failed!");
                });
        }
    );

    if (isadressSelected) {
        dbObject.data.transaction(function (tx) {
                tx.executeSql("UPDATE Tool4 SET diagnosis = ? where t_id = ?",
                    [tool.diagnosis, maxId],
                    function () {
                      
                        console.log("Update diagnosis : successful ");
                    },
                    function () {
                
                        console.log("Update diagnosis : fail!");
                    });
            }
        );
    }

    if (isphonnumbSelected) {
        dbObject.data.transaction(function (tx) {
                tx.executeSql("UPDATE Tool4 SET doctor = ? where t_id = ?",
                    [tool.doctor, maxId],
                    function () {
                       
                        console.log("Update doctor : successful");
                    },
                    function () {
                       
                        console.log("Update doctor : fail");
                    });
            }
        );
    }
};


// receive from bd to Set
dbObject.functions.getAllToolsFromBdToSet = function () {

    let resultArray = [];

    identifySelectedProperties();

    dbObject.data.transaction(function (tx) {
        tx.executeSql("SELECT * FROM Tool4", [],
            function (tx, resultSet) {
                for (let i = 0; i < resultSet.rows.length; i++) {
                    resultArray[i] = resultSet.rows.item(i);
                }
                toolSet.clear();

                // результат селекта в Set
                for (let i = 0; i < resultArray.length; i++) {
                    let tool = new Tool(resultArray[i]["t_name"],
                        resultArray[i]["t_address"],
                        resultArray[i]["t_telephone"],
                        resultArray[i]["t_reason"],
                        )
                    ;
                    tool.id = resultArray[i]["t_id"];


                    if (isadressSelected) {
                        tool.diagnosis = resultArray[i]["diagnosis"]
                    }
                    if (isphonnumbSelected) {
                        tool.doctor = resultArray[i]["doctor"]
                    }
                    toolSet.add(tool);
                }
                resetIds();
                writeIds();

            }, function () {
                console.log("error getAllTools!");
                //(error) => console.log(error);
            });

    })
};



// delete tool from db
dbObject.functions.deleteToolFromBd = function (id) {
    dbObject.data.transaction(function (tx) {
            tx.executeSql("DELETE FROM Tool4 WHERE t_id=?", [id])
        },
        function () {
            // alert("Tool was successfully deleted!");
            console.log("Data deleting failed!");
        },
        function () {
            // alert("Data deleting failed!");
            // (error) => console.log(error))
            console.log("Tool was successfully deleted!");
        });

}


function resetIds() {
    let selector = document.getElementById("idRow");

    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}

function writeIds() {
    let selector = document.getElementById("idRow");

    for (let tool of toolSet) {
        let option = document.createElement("OPTION");
        option.value = tool.id.toString();
        option.text = tool.id;
        selector.add(option);
    }
}

function Submit() {
    hideSomeObjects();
    identifySelectedProperties();


    let name = document.getElementById("name").value;
    let man = document.getElementById("man").value;
    let carnumb = document.getElementById("carnumb").value;
    let reason = document.getElementById("reason").value;

    let tool = new Tool(name, man, carnumb, reason);


    if (isadressSelected) {
        tool.diagnosis = document.getElementById("diagnosis").value;
    }

    if (isphonnumbSelected) {
        tool.doctor = document.getElementById("doctor").value;
    }
/*
    if (isSickLeaveSelected) {
        tool.SickLeave = document.getElementById("SickLeave").value;
    }
*/

    dbObject.functions.addToolInTableBd(tool);
    dbObject.functions.getAllToolsFromBdToSet();

    alert("Добавлено!");

}
function reset() {
    document.getElementById("name").reset();
    document.getElementById("using").reset();
    document.getElementById("weight").reset();
    document.getElementById("reason").reset();

    if (document.getElementById("diagnosis") != null) {
        document.getElementById("diagnosis").value = "";
    }
}

function removeItem() {
    hideSomeObjects();

    let caseID = document.getElementById("idRow");
    let field = caseID.value;
    dbObject.functions.deleteToolFromBd(field);
    dbObject.functions.getAllToolsFromBdToSet();

    alert("Удалено");
}

function showToolTable() {
    dbObject.functions.getAllToolsFromBdToSet();

    if (!(toolSet.size === 0)) {
        let table = document.getElementById("myTable");
        table.style.display = "block";

        let fields = Object.getOwnPropertyNames(Tool.prototype);


        /*  THRYLF!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ДОП показывает кол-во полей в табл*/
        k=0;
for (let Tool of toolSet){
    k++;    
}

console.log(k);
alert("Счётчик:" + k);


        let isadressSelected = fields.includes("diagnosis");
        let isphonnumbSelected = fields.includes("doctor");
        /*let isSickLeaveSelected = fields.includes("SickLeave");*/

        let tr = "<tr>";
        let td = "<td>";

        let trClose = "</tr>";
        let tdClose = "</td>";
        let cap = tr + "<tr> <th>ID</th> <th>Авто</th> <th>ФИО </th> <th>Номер</th> <th>Время парковки </th>";

        if (isadressSelected) {
            cap += "<th>Адрес</th>";
        }
        if (isphonnumbSelected) {
            cap += "<th>Телефонный номер</th>";
        }
        /*
        if (isSickLeaveSelected) {
            cap += "<th>Дата открытия больничного</th>";
        }*/
        cap += trClose;


        for (let tool of toolSet) {
            tr += td + tool.id + tdClose +
                td + tool.name + tdClose +
                td + tool.man + tdClose +
                td + tool.carnumb + tdClose +
                td + tool.reason + tdClose;

            if (isadressSelected) {
                tr += td + tool.diagnosis + tdClose;
            }
            if (isphonnumbSelected) {
                tr += td + tool.doctor + tdClose;
            }/*
            if (isSickLeaveSelected) {
                tr += td + tool.SickLeave + tdClose;
            }*/
            tr += trClose;

        }

        table.innerHTML = cap + tr;

    } else {
        alert("Авомобили не были добавлены");
    }

}

function hideSomeObjects() {
    let mas = document.getElementsByClassName("hidden");

    for (let i = 0; i < mas.length; i++) {
        mas[i].style.display = "none";
    }
}


function addNewField() {

    let selected = document.getElementById("propertiesToAdd");
    let value = selected.options[selected.selectedIndex].value;
    let intValue = Number(value);
    dbObject.functions.alterTable(intValue);


    if (intValue === 1 ) {
        let othersLabel = document.getElementById("labelForInputDiagnosis");
        othersLabel.innerText = "Адрес владельца: ";

        //динамическое создание поля ввода
        let otherInput = document.createElement("INPUT");
        otherInput.type = "text";
        otherInput.id = "diagnosis";
        otherInput.class = "newField";
        document.getElementById("DiagnosisBlock").appendChild(otherInput);


        Tool.prototype.diagnosis = "";


    } else if (intValue === 2  ) {
        let othersLabel = document.getElementById("labelForInputDoctor");
        othersLabel.innerText = "Телефонный номер: ";
        let otherInput = document.createElement("INPUT");
        otherInput.id = "doctor";
        otherInput.class = "newField";

        document.getElementById("DoctorBlock").appendChild(otherInput);

        Tool.prototype.doctor = "";
        
    }
    dbObject.functions.getAllToolsFromBdToSet();


}

function ShowMinMax() {

    let minValue;
    let strForMinWeights;

    dbObject.functions.getAllToolsFromBdToSet();
   
    if (toolSet.size > 0) {
        
       minValue = toolSet.values().next().value.reason;
       maxValue = toolSet.values().next().value.reason;
     
    console.log("1st tool weigh: " + minValue);



    for (var tool of toolSet) {
        if (tool.reason < minValue) {
            minValue = tool.reason;
        }
        if (tool.reason > maxValue){
            maxValue = tool.reason;

        }
    }
    strForMinWeights = "\n Минимальное время парковки = " + minValue + "\n";
    strForMinWeights += "Автомобили, простоявшие меньше всего: \n";

    for (let tool of toolSet) {
        if (tool.reason === minValue) {
            strForMinWeights += "ID " + tool.id +
                "  Название авто: " + tool.name +
                "  ФИО владельца: " + tool.man +
                "  Номер авто: " + tool.carnumb + "\n";
        }
    }
    strForMinWeights += " \n Максимальное время парковки = " + maxValue + "\n";
    strForMinWeights += "Автомобили, простоявшие дольше всего: \n";
    for (let tool of toolSet) {
        if (tool.reason === maxValue) {
            strForMinWeights += "ID " + tool.id +
                "  Название авто: " + tool.name +
                "  ФИО владельца: " + tool.man +
                "  Номер авто: " + tool.carnumb + "\n" ;

        }
    }
    }
    alert(strForMinWeights);

}


////
//
//
//

/*
function showNuvbOfItem() {

if(dbObject){
    dbObject.transaction(function (t) {
        t.executeSql("SELECT * FROM Tool4 ", [], numbb);
    })
}

}   

function numbb(transaction, result){
    let rows = result.rows;
    alert("КОл-во" + rows.length);
}
*/




//
//
//
/*
btn7.onclick = () => {
  
    db.transaction(function (tx) {
        tx.executeSql('SELECT* FROM Tool4', [], function (tx, res) {        
            alert(res.rows.length);
        });
    });
}*/

function identifySelectedProperties() {
    let fields = Object.getOwnPropertyNames(Tool.prototype);
    isadressSelected = fields.includes("diagnosis");
    isphonnumbSelected = fields.includes("doctor");
}