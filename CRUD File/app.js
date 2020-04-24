var express = require('express');
var app = express();
var fs = require('fs');

app.get('/read', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        res.send(jsonString)
    });
})

app.get('/add', (req, res) => {
    const customer = {
        "name": "mohit",
        "email": "abc@gmail.com",
        "phone": 123,
        "city": "mohit"
    };
    fs.readFile('./data.json', function(err, data) {
        var json = JSON.parse(data);
        json.push(customer);
        fs.writeFile("./data.json", JSON.stringify(json), function(err) {
            if (err) throw err;
            res.send('The "data to append" was appended to file!');
        });
    });
})

app.listen(3000, () => {
    console.log("Server started and Running on 3000.");
});