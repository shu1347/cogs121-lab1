var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    "twitterID": String,
    "token": String,
    "username": String,
    "displayName": String,
    "photo": String
});

var postSchema = mongoose.Schema({
  'user': {
    'username': String,
    'photo': String
  },
  'message': String,
  'posted': { type: Date, default: Date.now() },
  "comments": [{ 'photo': String, 'message': String, 'username': String, 'posted': { type: Date, default: Date.now() }}]
});


exports.User = mongoose.model('User', userSchema);
exports.Posts = mongoose.model('Posts', postSchema);
exports.SubwayPosts = mongoose.model('SubwayPosts', postSchema);
exports.LemongrassPosts = mongoose.model('LemongrassPosts', postSchema);
exports.RubiosPosts = mongoose.model('RubiosPosts', postSchema);
exports.StarbucksPosts = mongoose.model('StarbucksPosts', postSchema);
exports.SantorinisPosts = mongoose.model('SantorinisPosts', postSchema);
exports.TapexPosts = mongoose.model('TapexPosts', postSchema);
exports.BurgerKingPosts = mongoose.model('BurgerKingPosts', postSchema);
