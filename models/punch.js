const mongoose = require('mongoose');

var PunchSchema = new mongoose.Schema({
        fighterA: Number,
        fighterB: Number
    },
    {
        timestamps: true
    }
);

const Punch = mongoose.model('Punch', PunchSchema);

Punch.find({}, function(err, results) {
    if (err) {
        console.error(err);
    }
    else if (!results.length) {
        console.log("Punch mongo DB to be initiated.");

        var newPunch = new Punch({
            fighterA: 0,
            fighterB: 0
        });
        newPunch.save(function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
});

module.exports = Punch;
