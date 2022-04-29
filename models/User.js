const monogoose = require('monogoose');

const User = new mongoose.Schema({
    name:{type: 'string'},
    email:{type: 'string'},
    passaward:{type: 'string'}
});

const model = monogoose('User',User);

module.exports = model;