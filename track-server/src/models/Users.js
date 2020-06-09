const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// describe the structure that every user is going to have
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // no duplicate email addresses allowed
    unique: true,
    // user must provide an email address
    required: true,
  },
  password: {
    type: String,
    // user must provide password
    required: true,
  },
});

/** Mongoose Schema's have attached functions. This is the pre-<action> hook.
 *  The .pre() method takes one of the following strings as actions for
 *  the first param :
 *    - save (i.e., pre-save hook)
 *    - remove (pre-remove hook)
 *    - init  (pre-init hook)
 *    - validate  (pre-validate hook)
 *
 * It can also take two callbacks in order:
 *    1. HookSyncCB [required]
 *    2. ErrorCB [optional]
 *
 *
 * We must pass in a full-form function() so that we have access to
 * `this` within the function, rather than `this` associated with the file.
 * The function takes the arg 'next' which is the `HookNextFunction`
 * within mongoose.
 **/
userSchema.pre('save', function (next) {
  // given user the context of the userModel
  const user = this;

  // If the `password` field is not modified then don't validate,
  // just execute the next() callback that was passed in. In other words,
  // we only run this for **New Users**.
  if (!user.isModified('password')) {
    return next();
  }

  /**
   * since we know the password isn't modified, we'll salt and encrypt it.
   * Note that we generate the hash within genSalt so that the salt
   * is available to the hash function.
   *
   * We salt passwords to prevent Rainbow Attacks, an exploit used to guess
   * or determine passwords from a compromised database.
   */
  // function genSalt(rounds?: number, callback?: (err: Error, salt: string) => void): Promise<string>
  bcrypt.genSalt(10, (err, salt) => {
    // handle the error by passsing it on
    if (err) {
      return next(err);
    }

    // Pass in the user.password and salt into the hash maker
    bcrypt.hash(user.password, salt, (err, hash) => {
      // handle the error by passsing it on
      if (err) {
        return next(err);
      }

      // If no errors, then we replace the user.password with
      // the newly generated hash value.
      user.password = hash;
      next();
    });
  });
});

/**
 * comparePasswords will validate whether the password presented
 * for a given username is in fact the correct password for that
 * username (email address in this case).
 */
userSchema.methods.comparePasswords = function (candidatePassword) {
  // given user the context of the userModel
  const user = this;

  // We need to return a Promise because we need to make use of the
  // `async`/`await` keywords. The bcrypt library relies on callbacks
  // entirely, which is not nice (an artifact of node's heritage).
  return new Promise((resolve, reject) => {
    // bcrypt.compare will compare two hashes, remember user.password
    // is now also a hash. (is that right?)
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      // if there is an error, then reject the promise and
      // pass on the error information
      if (err) {
        return reject(err);
      }

      // if the passwords don't match, then reject the promise and
      // pass on a `false` value (i.e., passwords don't match)
      if (!isMatch) {
        return reject(false);
      }

      // otherwise resolve the promise and pass back the value, true
      resolve(true);
    });
  });
};

// associates the schema with the mongoose library
mongoose.model('User', userSchema);
