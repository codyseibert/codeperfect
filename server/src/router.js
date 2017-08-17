const app = require('./app')
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const hasRole = (role) =>
  (req, res, next) => {
    if (req.user.role.indexOf(role) === -1) {
      res.status(403).send({
        message: 'invalid role permissions to invoke this endpoint'
      })
    } else {
      next();
    }
  }

const SnippitsCtrl = require('./controllers/snippits_controller')
const ReportsCtrl = require('./controllers/reports_controller')
const LanguagesCtrl = require('./controllers/languages_controller')
const AuthenticationCtrl = require('./controllers/authentication_controller')

app.get('/snippits', SnippitsCtrl.index);
app.get('/snippits/:id', SnippitsCtrl.show);
app.post('/snippits',
  requireAuth,
  hasRole('admin'),
  SnippitsCtrl.post);

app.get('/reports',
  requireAuth,
  ReportsCtrl.index);
app.get('/reports/:id',
  requireAuth,
  ReportsCtrl.show);
app.post('/reports',
  requireAuth,
  ReportsCtrl.post);

app.get('/languages',
  LanguagesCtrl.index);

app.post('/languages',
  requireAuth,
  hasRole('admin'),
  LanguagesCtrl.post);

app.post('/login', AuthenticationCtrl.login);
app.post('/register', AuthenticationCtrl.register);
