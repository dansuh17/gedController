var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
  gameGoingOn: Boolean,
  fighter2: Number,
  fighter1: Number
},
  {
    timestamps: true
}
);

var Vote = mongoose.model('Vote', VoteSchema);

// test if the desired document already exists and if it doesn't,
// save a dummy data for warming up the fresh db
Vote.find({}, function (err, results) {
  if (err) {
    console.log('mongo : error!');
    console.log(err);
  } else if (!results.length) {
    console.log('mongo : db empty - setting up initial document for first time setup');

    // dummy schema
    var firstVote = new Vote({
      fighter1: 0,
      fighter2: 0,
      gameGoingOn: false
    });

    // save a first vote!
    firstVote.save(function (saveErr) {
      if (err) {
        console.error(saveErr);
      }
    });
  } else {
    console.log('mongo : database good to go');
  }
});

module.exports = Vote;
