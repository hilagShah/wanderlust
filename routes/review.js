const express = require("express");
const router = express.Router({ mergeParams : true }); // mergerParams is needed here as /listings/:id/reviews(required when parameter values are coming from the app.js  ) routes are coming here so params are coming hence it is required otherwise null error will be displayed.
const Listing = require("../models/listings");
const Review = require("../models/review");
const { isLoggedIn, isReviewAuthor} = require("../middleware");
const reviewController = require("../controllers/reviews");

router.post("/", isLoggedIn, reviewController.createReview);

router.route("/:reviewId").get(reviewController.updateReviewForm)
.put(isLoggedIn, isReviewAuthor, reviewController.updateReview)
.delete(isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;