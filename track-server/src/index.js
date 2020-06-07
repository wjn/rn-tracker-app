const express = require('express');
const mongoose = require('mongoose');

const app = express();

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

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, () => {
  console.log('Track-Server listening on port 3000');
});
