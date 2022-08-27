require('dotenv').config();
const {PORT} = process.env;

const sqlite3 = require('sqlite3');
const express = require('express');
const {promisify} = require('util');
const integrities = require('./integrities');

const app = express();
app.set('view engine', 'ejs');
app.use('/css/bootstrap', express.static('node_modules/bootstrap/dist/css'));
app.use('/css', express.static('public/css'));
app.use('/js/popper', express.static('node_modules/@popperjs/core/dist/umd'));
app.use('/js/jquery', express.static('node_modules/jquery/dist'));
app.use('/js/bootstrap', express.static('node_modules/bootstrap/dist/js'));
app.use('/js', express.static('public/js'));

app.use((req, res, next) => {
	res.locals.integrities = integrities;
	next();
});

app.use('/', require('./lib/routers/button'));

const tasklist = require('./lib/routers/tasklist');
app.use('/tasklist', tasklist);
app.delete('/tasklist/:id', tasklist.del);

app.listen(PORT, () => console.info(`Task Button running on port ${PORT}`));
