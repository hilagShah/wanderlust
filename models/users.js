const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    }
});

userSchema.plugin(passportLocalMongoose);
// as we are using passport local mongoose the two default fields : username and password will be created , hence we don't type it manually

module.exports = mongoose.model('User', userSchema);