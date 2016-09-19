var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = new Schema({
    username: {type: String, required: true},
    service: {type: String, required: true}
});

module.exports = mongoose.model('Contact', Contact);
