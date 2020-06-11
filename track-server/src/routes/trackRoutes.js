const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

// Use the Track Model
const Track = mongoose.model('Track');

// create new router object
const router = express.Router();

// Use requireAuth middleware for these routes
router.use(requireAuth);

// Get list of all user's track records
router.get('/tracks', async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});

/**
 * Assumed POST mock:
 * {
 *  name: 'My Track',
 *  locations: [
 *      {
 *          timestamp: 123123,
 *          coords: {...}
 *      }
 *  ]
 * }
 */
router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    console.log('req.body: ', req.body);
    console.log('name: ', name);
    console.log('locations: ', locations);

    return res
      .status(422)
      .send({ error: 'You must provide a name and locations.' });
  }

  /**
   * Since name and locations haven't been validated, we'll
   * wrap our DB save in a try/catch block and handle
   * any validation errors that might arise.
   */
  try {
    // create a new Track objcect and populate it with the
    // name, locations and current userId.
    const track = new Track({ name, locations, userId: req.user._id });
    // write to the db
    await track.save();
    // upon successful write to the db, respond with a 200 status and
    // echo back the successfully saved track object
    res.status(200).send(track);
  } catch (e) {
    // on error send 422 status and error message
    res.status(422).status({ error: e.message });
  }
});

module.exports = router;
