const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// if auth successful then use next callback
module.exports = (req, res, next) => {
  // express automatically makes all header properties lowercased
  const { authorization } = req.headers;
  // authorization === 'Bearer dsfasdafjhasdjfhs...'

  console.log('[requireAuth] authorization: ', authorization);

  // if authorization header is missing
  if (!authorization) {
    console.log('[requireAuth] Missing authorization header');
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  // remove the `Bearer ` prefix on the token and
  // just get the encrypted key
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      console.log('[requireAuth] jwt could not be verified');
      console.log(`[requireAuth] payload:`, payload);

      return res.status(401).send({ error: 'You must be logged in.' });
    }

    // extract userId from the payload passed in through
    // jwt.verify callback above.
    const { userId } = payload;

    console.log('[requireAuth] userId', userId);

    // grab the user from the db by ID
    const user = await User.findById(userId);

    // attach user directly to req object so that the rest
    // of the app has access to the user data.
    req.user = user;

    // execute callback now that we've been successfull
    next();
  });
};
