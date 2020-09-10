var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var getIP = require('ipware')().get_ip;

var guestSchema = new Schema({
	ip : {
		type : String,
	},
	name : {
		type : String,
	},
	email : {
		type : String,
	},
	message : {
		type : String,
	},
	date : { 
		type : Date, 
		default : Date.now
	}
});

var Guest = mongoose.model('Guest', guestSchema);

exports.SaveDoc = function(req, call){
	var newGuest = new Guest();
	newGuest.ip = getIP(req).clientIp;
	newGuest.name = req.body.name;
	newGuest.email = req.body.email;
	newGuest.message = req.body.message;
	newGuest.date = Date.now();
	newGuest.save(function (err) {
		if (err) {
			call(err);
		} else {
		  call(newGuest);
		}
	});
};