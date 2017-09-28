var Guest = require('./app/models/guest');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require("body-parser");
var getIP = require('ipware')().get_ip;
var app = express();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));
app.use('/controllers', express.static(__dirname + '/app/controllers'));
app.use(function(req, res, next){
	console.log('Requester:', getIP(req).clientIp, 'Time:', new Date(Date.now()), 'Where:', req.url, 'Data:', req.body);
	next();
});

app.route("/")
    .get(function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });

app.route("/saveMessage")
    .post(function (req, res) {
        var newGuest = new Guest();
    	newGuest.ip = getIP(req).clientIp;
    	newGuest.name = req.body.name;
    	newGuest.email = req.body.email;
    	newGuest.message = req.body.message;
    	newGuest.date = Date.now();
    	newGuest.save(function (err) {
    		if (err) {
    			res.send(err);
    		} else {
    		    res.send(newGuest);
    		}
    	});
    });

app.use(function(req, res, next){
	res.end('no way out dude!');
});

app.listen(process.env.PORT, function () {
    var date = new Date(Date.now());
	var time = date.toLocaleTimeString('en-US', { hour12: false });
	var day = date.toDateString();
    console.log('Server listening :\n', 'Port:', process.env.PORT, 'Time :', day + ' ' + time);
});