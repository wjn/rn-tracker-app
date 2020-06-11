const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  // When we pull a timestamp from a mobile device we get a number
  // that represents the number of milliseconds since 1970.
  timestamp: Number,
  coords: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    altitude: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    heading: {
      type: Number,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
  },
});

const trackSchema = new mongoose.Schema({
  userId: {
    // ObjectId (upper 'I', lower 'd') indicates that userId is a
    // reference to some other property in MongoDB.
    type: mongoose.Schema.Types.ObjectId,
    // ref: is a prop used by mongoose to point to another Schema
    // so we're telling mongoos that `userId` is going to be the
    // ObjectId of record that is of the User type that
    // we defined in models/Users.js.
    ref: 'User',
  },
  name: {
    type: String,
    // If user doen't name their track, it will default to the
    // value of an empty string.
    default: '',
  },
  locations: [pointSchema],
});

// We make available the 'Track' Schema here. This is what ties
// some collection of data in MongoDB to Mongoose. We're not
// going to have a *collection* of points. We're going to have
// a Track that contains an array of points as a location
// property. It's how mongo does relational connections.
//
// Summary: only define a model with a schema when you
// intend to have a *Collection* in mongoDB.
mongoose.model('Track', trackSchema);
