const express = require('express'), app = express();
const path = require("path");
app.set('port', 6548);
app.use(express.static(__dirname + '/static'));

app.use("/", function(request, response){
    response.sendFile('index.html', {root:path.join(__dirname, 'static/html')});
});

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});