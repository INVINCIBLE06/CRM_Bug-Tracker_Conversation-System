const express = require('express');
const app = express();
const db = require("./models");
const init = require('./init');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

db.sequelize.sync({force : true}).then(() => 
{
    console.log('Tables dropped and recreated');
    init();
});

require('./routes/user.route')(app);


module.exports =  app;