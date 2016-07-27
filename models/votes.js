var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
    tomUp: Integer, 
    devinUp: Integer,
},
{
    timestamps: true
}
);

mongoose.model('Vote', VoteSchema);
