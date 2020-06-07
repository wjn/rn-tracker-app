const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const mongoUri =
  'mongodb+srv://wjn:roister-lockjaw-valved@cluster0-njk2r.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(mongoUri, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log('MongoDB connected correctly to server');
  } catch (err) {
    console.log('[MongoDB error connecting to mongo] : ', err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, () => {
  console.log('Track-Server listening on port 3000');
});
