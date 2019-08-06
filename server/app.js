import express from 'express';
import session from 'express-session';

import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import db from './models/db.js';
import routes from './routes/index';
import http from 'http';

var app = express();
var port = process.env.PORT || '5000';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(session({
	resave: false, // don't save session if unmodified
	saveUninitialized: false, // don't create session until something stored
	secret: 'booksession'
}));

//静态文件目录
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log('err', err)
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.set('port', port);
var server = http.createServer(app);
server.listen(port);
