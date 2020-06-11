const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

const SECRET_KEY = 'MY_SECRET_KEY';

router.post('/signup', async (req, res) => {
  // destructure the email and password props from the req.body
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    // create the JWT using the user._id stored in mongodb
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.send({ token });
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.post('/signin', async (req, res) => {
  // destructure the email and password props from the req.body
  const { email, password } = req.body;

  // both email and password must be provided
  if (!email || !password) {
    // if either email or password are missing,
    // peace out and return early with an error message
    return res.status(422).send({ error: 'Email and Password are required.' });
  }

  // BEGIN: login process
  // Reaching out to MongoDb is async therefore must
  // use `await` to define user from db call
  const user = await User.findOne({ email });

  // after db lookup, if no record is found peace out and alert the user (vaguely)
  // Note possible statuses we could use:
  // status 422 = something wrong with request
  // status 404 = not found
  // status 401 = forbidden
  if (!user) {
    console.log(
      'User (null) could not be found based on email address provided',
      email
    );
    return res.status(422).send({ error: 'Email or Password invalid.' });
  }

  try {
    await user.comparePasswords(password);

    // if promise is resolved
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.send({ token });
  } catch (e) {
    // If the promise is rejected we'll catch that, error out and
    // send notification to user.
    console.log('Login Status', e);
    return res.status(422).send({ error: 'Email or Password invalid.' });
  }
});

module.exports = router;
