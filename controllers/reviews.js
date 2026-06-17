const Review = require("../models/review");
const Listing = require("../models/listings");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(req.user.id);
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save(); 
    console.log("new review saved");
    req.flash("success", "Your valueable review is added!");
    res.redirect(`/listings/${req.params.id}`)
};

module.exports.updateReviewForm = async (req, res) => {
    let { id, reviewId } = req.params;
    let listing = Listing.findById(id);
    res.render("listings/updateReview" , { id, reviewId });
};

module.exports.updateReview = async (req, res) => {
    let { comment, rating } = req.body.review;
    let { id, reviewId } = req.params;
    let listing = Listing.findById(id);
    await Review.findByIdAndUpdate(reviewId, {
        rating : rating,
        comment : comment
    });
    console.log("review updated");
    req.flash("success", "Your review is updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Your review is deleted!");
    res.redirect(`/listings/${id}`);
};