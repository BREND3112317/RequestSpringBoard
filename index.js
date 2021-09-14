const express = require('express');
const app = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const port = process.env.port || 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/:ip/:path([\/a-z0-9A-Z]+)', function(req, res) {
    let _url = `http://${req.params.ip}/${req.params.path}`;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
            res.send(xhr.responseText);
        }
    }

    xhr.open(req.method, _url, true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(req.body));
});

app.listen(port, () => {
    console.log(`[System] POST / GET / PUT / DELETE http://localhost:${port}/url`)
})