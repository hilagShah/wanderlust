const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
});
const Listing = require("../models/listings");
const alldata = require("./data");
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URI;

main().then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    console.log(MONGO_URL);
    await mongoose.connect(MONGO_URL);
}

// const initDB = async () => {
//     await Listing.deleteMany({});
//     alldata.data = alldata.data.map((obj) => ({ ...obj, owner: "6a49f6b19b9f68d2545e76e4" }))
//     await Listing.insertMany(alldata.data);
//     console.log("data was initialized");
// };

// initDB();