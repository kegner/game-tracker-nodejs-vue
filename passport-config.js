const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcrypt');

function initialize(passport) {
  passport.use(new LocalStrategy(async function authenticate(username, password, done) {
    let user;
    try {
      user = await User.query().findOne("username", username);
      if (!user) {
        return done(null, false, { message: "Username is wrong" });
      }
    } catch (error) {
      return done(error, false, { message: "Error occurred" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user, { message: "Authenticated!" });
      } else {
        return done(null, false, { message: "Password is wrong" });
      }
    } catch (error) {
      return done(error, false, { message: "Error occurred" });
    }
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.query().findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initialize;