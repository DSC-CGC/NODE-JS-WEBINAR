var express = require('express');
var app = express();
var fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json());


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

app.post('/update',(req,res)=>{
    fs.readFile('./user.json', function(err, data) {
        var json = JSON.parse(data);
        console.log("Data before Updating");
        console.log(json)
        json.map((curr) => {
        if(curr.name == req.body.name) {
            curr.name=(req.body.name)
            curr.email=(req.body.email)
            curr.phone=(req.body.phone)
            }
        });
        console.log("Data After Updating");
        console.log(json)
        fs.writeFile("./user.json", JSON.stringify(json), function(err) {
            if (err) throw err;
            res.send('The data was updated from Users');
        });
    });
})

app.listen(3000, () => {
    console.log("Server started and Running on 3000.");
});