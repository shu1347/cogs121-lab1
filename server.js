// Node.js Dependencies
const express = require("express");
const app = express();
const http = require("http").createServer(app);
var mongoose = require('mongoose');
var handlebars = require('express-handlebars');
var io = require('socket.io')(http);

// const io = require("socket.io")(http);
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

require("dotenv").load();
var models = require("./models");
var db = mongoose.connection;

var router = {
    index: require("./routes/index"),
    chat: require("./routes/chat"),
    home: require("./routes/home"),
    subway:require("./routes/subway"),
    lemongrass:require("./routes/lemongrass")
};

var parser = {
    body: require("body-parser"),
    cookie: require("cookie-parser")
};

var strategy = { /* TODO */ };

// Database Connection
var db = mongoose.connection;
console.log(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/cogs121');

db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected successfully.");
});

// session middleware
var session_middleware = session({
    key: "session",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        mongooseConnection: db
    })
});

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine('html', handlebars({
    defaultLayout: 'layout',
    extname: '.html'
}));
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.cookie());
app.use(parser.body.urlencoded({
    extended: true
}));
app.use(parser.body.json());
app.use(require('method-override')());
app.use(session_middleware);
/* TODO: Passport Middleware Here*/
app.use(passport.initialize());
app.use(passport.session());
/* TODO: Use Twitter Strategy for Passport here */
// console.log(process.env.TWITTER_CONSUMER_KEY);

passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback"
    },
    //580401894
    function(token, tokenSecret, profile, done) {
        console.log(profile.id);
        models.User.findOne({
            twitterID: profile.id
        }, function(err, user) {
            // (1) Check if there is an error. If so, return done(err);
            if (err) {
                return done(err);
            }
            if (!user) {
                var newUser = new models.User({
                    "twitterID": profile.id,
                    "token": token,
                    "username": profile.screen_name,
                    "displayName": profile.displayName,
                    "photo": profile.photos[0]
                });
                newUser.save();
                return done(null, profile);
            } else {
                process.nextTick(function() {
                    user.twitterID = profile.id;
                    user.token = token;
                    user.username = profile.username;
                    user.displayName = profile.displayName;
                    user.photo = profile.photos[0];
                    user.save();
                    return done(null, profile);
                });
            }
        });
    }
));

/* TODO: Passport serialization here */
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
// Routes
/* TODO: Routes for OAuth using Passport */
app.get("/", router.index.view);
app.get("/chat", router.chat.view);
app.get("/home", router.home.view);
app.get("/subway", router.subway.view);
app.get("/lemongrass", router.lemongrass.view);

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/home',
        failureRedirect: '/'
    }));
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// More routes here if needed


io.use(function(socket, next) {
  session_middleware(socket.request, {}, next);
});

io.on('connection', function(socket){
  console.log('user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  })
  socket.on('newComment', function(comment){
    console.log('new comment');
    console.log(comment);
    var user = socket.request.session.passport.user;
    console.log(comment.parent_post_id);

    models.Posts.findOne({
            _id: comment.parent_post_id
        },function(err, post) {
            console.log(comment.comment);
            var newComment = {'username': user.username,
        'photo': user.photos[0].value,
        'message': comment.comment
        }
        post.comments.push(newComment);
        post.save();
        console.log(post);
        });

    /////////////////////

    models.SubwayPosts.findOne({
            _id: comment.parent_post_id
        },function(err, post) {
            console.log(comment.comment);
            var newComment = {'username': user.username,
        'photo': user.photos[0].value,
        'message': comment.comment
        }
        post.comments.push(newComment);
        post.save();
        console.log(post);
        });

    /////////////////////


    models.LemongrassPosts.findOne({
            _id: comment.parent_post_id
        },function(err, post) {
            console.log(comment.comment);
            var newComment = {'username': user.username,
        'photo': user.photos[0].value,
        'message': comment.comment
        }
        post.comments.push(newComment);
        post.save();
        console.log(post);
        });


  })

  socket.on('newsfeedSubway', function(msg) {
    var user = socket.request.session.passport.user;
    var newNewsFeedSubway = new models.SubwayPosts({
      'user': {
        'username': user.username,
        'photo': user.photos[0].value
      },
      'message': msg
    });
    newNewsFeedSubway.save(function(err, news) {
      if(err) console.log(err);
      io.emit('newsfeedSubway', JSON.stringify(news));
    });
  });

  /////////////////////

  socket.on('newsfeed', function(msg) {
    var user = socket.request.session.passport.user;
    var newNewsFeed = new models.Posts({
      'user': {
        'username': user.username,
        'photo': user.photos[0].value
      },
      'message': msg
    });
    newNewsFeed.save(function(err, news) {
      if(err) console.log(err);
      io.emit('newsfeed', JSON.stringify(news));
    });
  });

  /////////////////////

  socket.on('newsfeedLemongrass', function(msg) {
    var user = socket.request.session.passport.user;
    var newNewsFeedLemongrass = new models.LemongrassPosts({
      'user': {
        'username': user.username,
        'photo': user.photos[0].value
      },
      'message': msg
    });
    newNewsFeedLemongrass.save(function(err, news) {
      if(err) console.log(err);
      io.emit('newsfeedLemongrass', JSON.stringify(news));
    });
  });

})


/* TODO: Server-side Socket.io here */

// Start Server
http.listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});