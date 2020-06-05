const express = require('express');
const app = express();
require('dotenv/config');

app.set('view engine', 'pug');
app.use(express.static('public'))

const routes = require('./routes/index');

app.use('/', routes);

app.listen(3000);