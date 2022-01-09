const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const urlencodedParser = express.urlencoded({extended: false});

app.listen(3001, () => console.log('Server is running'));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('html/index.html'));
})

app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(req.url.slice(1)));
});

app.post('/', urlencodedParser ,(req, resp) => {
    fs.writeFile(path.resolve('resource/dataPlain.txt'), getParams(req.body), (err) => {
        if (err) console.log(err);
    });
    fs.writeFile(path.resolve('resource/dataXML.xml'), toXML(req.body), (err) => {
        if (err) console.log(err);
    })
    resp.sendFile(path.resolve('html/index.html'));
})

function getParams(body) {
    let result = '';
    for (let el in body) {
        result += body[el] + '\n';
    }
    return result;
}

function toXML(obj) {
    let result = '';
    for (let el in obj) {
        result += `<${el}>`;
        result += typeof(obj[el]) == 'object' ? toXML(obj[el]) : obj[el];
        result += `</${el}>`;
    }
    return result;
}

