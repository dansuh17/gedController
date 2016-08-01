var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
    tomUp: Number, 
    devinUp: Number,
    gameGoingOn: Boolean
},
{
    timestamps: true
}
);

mongoose.model('Vote', VoteSchema);
