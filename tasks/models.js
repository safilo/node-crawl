var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect('mongodb://123.57.143.189:27017/wlqingcrawl');

exports.Category = mongoose.model('Category', new mongoose.Schema({
    name: String,
    url: String
}));
exports.Tv = mongoose.model('Tv', new mongoose.Schema({
    cid:{type:ObjectId,ref:'Category'},
    name: String,
    url: String
}));