const express = require('express');
const app = express();
const PORT = process.env.PORT || 8083;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var controller = require('./controller');

app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json());

var mongodb = 'mongodb://mohit:mohit@cluster0-shard-00-00-icvlu.mongodb.net:27017,cluster0-shard-00-01-icvlu.mongodb.net:27017,cluster0-shard-00-02-icvlu.mongodb.net:27017/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin'

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.once('open', function() {
    console.log('connected db');
});

db.on('error', function(err) {
    if (err) console.log(err);
});

app.post('/add', controller.add_user);

app.post('/find', controller.find_user);

app.post('/update', controller.update_user);

app.post('/delete', controller.delete_user);

app.listen(PORT, function() {
    console.log(`Server  running on ${PORT}`);
})