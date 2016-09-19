var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Service = new Schema({
    name: {type: String, required: true},
    jid: {type: String},
    password: {type: String}
});

module.exports = mongoose.model('Service', Service);
