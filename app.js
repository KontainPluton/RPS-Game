let express = require('express');
let path = require('path');

let app = express();

let apiRoute = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/views'));
app.use("/api", apiRoute);

module.exports = app;
