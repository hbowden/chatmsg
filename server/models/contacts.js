var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = new Schema({
    username: {type: String, required: true},
    services: [
      {type: Schema.Types.ObjectId, ref: 'Service'}
    ]
});

module.exports = mongoose.model('Contact', Contact);
