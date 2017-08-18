const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const log4js = require('log4js')
const logger = log4js.getLogger('app')
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const app = express()
app.use(log4js.connectLogger(logger, {level: log4js.levels.TRACE}))
app.use(bodyParser.json())
app.use(cors({origin: '*'}));

const User = require('./models/user');
const config = require('./config/main.js')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}
const jwtLogin = new JwtStrategy(jwtOptions, async function(jwtPayload, done) {
  try {
    const user = await User.findById(jwtPayload._id)
    if (!user) return done(null, false);
    done(null, user.toObject());
  } catch (err) {
    done(err, false);
  }
});

passport.use(jwtLogin);

module.exports = app;
