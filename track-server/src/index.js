/**
 * Data Models:
 * Can only require mongoose models 1x or
 * you will have problems. We require them
 * at the root of the app here, so that
 * they are available for the entire app.
 */
require('./models/Users');
require('./models/Track');
// Libraries
const express = require('express');
const mongoose = require('mongoose');
// Utilities
const bodyParser = require('body-parser');
// Routes
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
// Middlewares
const requireAuth = require('./middlewares/requireAuth');

// Defines app as an express object
const app = express();

// allow response bodies to handle json
app.use(bodyParser.json());

// make required routes available to the app
app.use(authRoutes);
app.use(trackRoutes);

/**
 * URI generated at mongodb.com.
 * DB: test
 * USER: wjn
 * Password: roister-lockjaw-valved
 * Cluster: cluster0-njk2r.mongodb.net
 */

const mongoUri =
  'mongodb+srv://wjn:roister-lockjaw-valved@cluster0-njk2r.mongodb.net/test?retryWrites=true&w=majority';

// connect to the
mongoose.connect(mongoUri, {
  // options object
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to mongo instance');
});

db.on('error', (err) => {
  console.log('[Error connecting to mongo] : ', err);
});

// include requireAuth middleware to validate only
// authenticated users have access to the route
app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Track-Server listening on port 3000');
});
