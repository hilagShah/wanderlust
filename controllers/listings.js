const Listing = require("../models/listings");
const review = require("../models/review");

module.exports.index = async (req,res) => {
    let allListings = await Listing.find().sort({ createdAt : -1 });
    res.render("listings/listings.ejs", { allListings });
};

module.exports.newForm = (req,res) => {
    res.render("listings/new.ejs");
};

module.exports.updateListingForm = async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let originalUrl = listing.image.url;
    originalUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/update.ejs", { listing, originalUrl });
};

module.exports.getListingById = async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    .populate({
            path: "reviews",
            options: {
                sort: { createdAt: -1 }   // Newest first
            },
            populate: {
                path: "author"
            }
        }).populate("owner");
    if(!listing) {
        req.flash("error", "No listings found!");
    }
    res.render("listings/details.ejs", { listing });
};

module.exports.createNewListing = async (req,res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
};

module.exports.updateListing = async (req,res,next) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted!");
    res.redirect("/listings");
};