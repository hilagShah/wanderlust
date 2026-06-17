const alldata = require("./data");
const mongoose = require("mongoose");
const Listing = require("../models/listings");
const MONGO_URL = process.env.MONGO_URI;

main().then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  alldata.data = alldata.data.map((obj) => ({...obj, owner : "6a2bc3dad893a7ff818af662"}))
  await Listing.insertMany(alldata.data);
  console.log("data was initialized");
};

initDB();