var express = require('express');
var app = express();
var fs = require('fs');

app.get('/read', (req, res) => {
    fs.readFile('./user.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        res.send({
            'msg':'File Data',
            jsonString
        })
    });
})

app.post('/add', (req, res) => {
    const customer = {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "city": req.body.city
    };
    fs.readFile('./user.json', function(err, data) {
        var json = JSON.parse(data);
        json.push(customer);
        fs.writeFile("./user.json", JSON.stringify(json), function(err) {
            if (err) throw err;
            res.send('The "data to append" was appended to file!');
        });
    });
})

app.post('/delete',(req,res)=>{
    fs.readFile('./user.json', function(err, data) {
        var json = JSON.parse(data);
        console.log("Data before Deletion");
        console.log(json)
        json=json.filter(data=>{
            return data.name!=(req.body.name)
        })
        console.log("Data After Deletion");
        console.log(json)
        fs.writeFile("./user.json", JSON.stringify(json), function(err) {
            if (err) throw err;
            res.send('The data was deleted from Users');
        });
    });
})

app.listen(3000, () => {
    console.log("Server started and Running on 3000.");
});