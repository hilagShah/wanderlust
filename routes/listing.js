const express = require("express");
const router = express.Router({ mergeParams : true }); // mergerParams is not needed here as /listings routees are coming here so no params are coming hence it is not required.
const Listing = require("../models/listings");
const ExpressError = require("../ErrorExpress"); 
const { isLoggedIn, isOwner} = require("../middleware");
const listingsController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });


router.route("/").get(listingsController.index)
.post(isLoggedIn, upload.single('listing[image]'), listingsController.createNewListing);

router.get("/create", isLoggedIn, listingsController.newForm);

router.get("/update/:id", listingsController.updateListingForm);

router.route("/:id")
.get(listingsController.getListingById)
.put(isLoggedIn, isOwner, upload.single('listing[image]'), listingsController.updateListing)
.delete(isLoggedIn, isOwner, listingsController.deleteListing);


module.exports = router;