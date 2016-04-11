// var models = require("../models");
var mongoose = require('mongoose');

exports.view = function(req, res) {
    /* TODO */
    if (req.user) {
        mongoose.model('PandaPosts').find(function(err,posts){
        console.log(posts);
		if(err){
			console.log(err);
		}
		else{
	    	res.render("panda", {'newsfeedPanda': posts});
		}
    })
    } else {
        res.redirect("/");
    }
};