const mongoose = require("mongoose");
const User = require("./users");

// const reviewsSchema = new mongoose.Schema({
//     comment : String,
//     rating : {
//         type : Number,
//         min : 1,
//         max : 5,
//     },
//     createdAt : {
//         type : Date,
//         default : Date.now,
//     },
//     author : {
//         type : mongoose.Schema.Types.ObjectId,
//         ref : "User",
//     },
// });

const reviewsSchema = new mongoose.Schema(
    {
        comment: String,
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Review", reviewsSchema);