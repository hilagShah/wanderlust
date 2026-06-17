if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const port = 3000;
const listingsRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users");
const MONGO_URL = process.env.MONGO_URI;
const MongoStore = require("connect-mongo");

// console.log(process.env.SECRET); // WE CAN ACCESS .env CREDEENTIAL BY USING process.env.KEY

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"/views")); // used to access run the project when outside the directory
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs" , ejsMate);

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended : true})); // this helps express to read the data encoded in the url format
app.use(express.json());

//MongoDB connection
main().then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log(err);
});

// const store = MongoStore.create({
//     mongoUrl : MONGO_URL,
//     crypto : {
//         secret : process.env.SECRET,
//     },
//     touchAfter : 24 * 3600,
// })

// store.on("error", () => {
//     console.log("ERROR IN MONGO SESSION STORE", err);
// });
//cookies setup
const sessionOptions = {
    // store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days in millliseconds
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true, // to prevent cross scripting attacks
    },
}

// app.get("/" , async (req,res) => {
//     res.send("hello!!")
// });

//cookies setup
app.use(session(sessionOptions));
app.use(flash()); // all routes should be written (on which flash has to be applied) after these lines of code.

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// routes 
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
})

//MongoDB connection
async function main() {
    await mongoose.connect(MONGO_URL); // uses cloud storage
}