
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , config = require('./config')
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , User = require('./models/user')


function testUserDb () {

  console.log("Pushing dummy item...");

  var dummy = new User();
  dummy.fbId = 'testfbId';
  dummy.name = 'testName';
  dummy.email = 'testmail@testdomain.com';

  dummy.save(function (error){
    done()
  });
}


var app = express();

// Setting up passport
passport.serializeUser(function (user, done){
  done(null, user.fbId);
});

passport.deserializeUser( function (id, done) {
  User.findOne ( {'fbId': id}, function (error, user) {
    done(error, user);
  });
})


passport.use(new FacebookStrategy(
  {
    clientID: config.dev.fb.appId,
    clientSecret: config.dev.fb.appSecret,
    callbackURL: config.dev.fb.url + 'fbauthed'
  },

  function (req, accessToken, refreshToken, profile, done){
      process.nextTick(function(){
        // Check for existing user and login or else create
        // new user.
      var query = User.findOne({'fbId': profile.id});

      query.exec(function (error, existingUser) {
        if (error) {
          throw error;
        }

        if ( existingUser ){
          console.log('Existing user: ' + existingUser.name + ' logged in');
          done(null, existingUser);
        }

        else {

          // Create the new user
          var newUser = new User();
          newUser.fbId = profile.id;
          newUser.email = profile.emails[0].value;
          newUser.name = profile.displayName;

          // Save the new user
          newUser.save(function (error) {
            if (error) {
              throw error;
            }
            console.log('New user: ' + newUser.name + ' found and logged in')
            console.log(newUser);
            done(null, newUser);
          });
        }
      })
    }
  )}
));

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());

  app.use(express.bodyParser());

  app.use(express.session({secret: 'contact'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));


  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
// Auth routes
app.get('/fbauth', passport.authenticate('facebook', { scope: 'email'}));
app.get('/fbauthed', passport.authenticate('facebook', {failureRedirect: '/'}), routes.loggedin);
app.get('/logout', function (req, res){
  req.logOut();
  res.redirect('/');
})

app.get( '/*' , function(req, res, next) {
        var file = req.params[0]; 
        res.sendfile( __dirname + '/' + file );
})

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});