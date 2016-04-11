// var models = require("../models");
var mongoose = require('mongoose');

exports.view = function(req, res) {
    /* TODO */
    if (req.user) {
        mongoose.model('SubwayPosts').find(function(err,posts){
        console.log(posts);
		if(err){
			console.log(err);
		}
		else{
	    	res.render("subway", {'newsfeedSubway': posts});
		}
    })
    } else {
        res.redirect("/");
    }
};