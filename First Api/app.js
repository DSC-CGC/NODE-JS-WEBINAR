var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send("My First API");
});

app.get('/:param', (req, res) => {
    res.send("Hello " + req.params.param);
});



app.listen(3000, () => {
    console.log("Server started and Running on 3000.");
})