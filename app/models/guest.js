var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Guest = new Schema({
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

module.exports = mongoose.model('Guest', Guest);