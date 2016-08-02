const mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
    tomUp: Number, 
    devinUp: Number,
    gameGoingOn: Boolean
},
{
    timestamps: true
}
);

const Vote = mongoose.model('Vote', VoteSchema);
mongoose.connect('mongodb://localhost:27017/ged');

// test if the desired document already exists and if it doesn't,
// save a dummy data for warming up the fresh db
Vote.find({}, function(err, results) {
  if (err) {
    console.log("mongo : error!");
    console.log(err);
  } else if (!results.length) {
    console.log("mongo : db empty - setting up initial document for first time setup");

    // save a first vote!
    var firstVote = new Vote({
      tomUp: 0,
      devinUp: 0,
      gameGoingOn: false
    });

    firstVote.save(function(err) {
      if (err) {
        return console.error(err);
      }
    });
  } else {
    console.log("mongo : database good to go");
  }
});


module.exports.Vote = Vote;
