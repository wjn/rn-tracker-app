require('./models/Users');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  'mongodb+srv://wjn:roister-lockjaw-valved@cluster0-njk2r.mongodb.net/test?retryWrites=true&w=majority';

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
