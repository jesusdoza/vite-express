import express from "express";
const app = express();
// const mongoose = require("mongoose");
// const passport = require("passport");
// const MongoStore = require("connect-mongo"); //session store
// const flash = require("express-flash");
// const session = require("express-session");
// const logger = require("morgan");
// const cors = require("cors");
// const MethodOverride = require("method-override");
// const HttpsRedirect = require('./middleware/httpsRedirect')//!not used yet

//enviroment vars
// require("dotenv").config({ path: "./config/.env" });

// passport config
// require("./config/passport")(passport);

const PORT = 8000;

// import connectDB from "./config/db";
// connectDB();

//authentication middleware
// import { ensureAuth, ensureGuest } from "./middleware/auth";
// import { apiEnsureAuth } from "./middleware/apiAuth";

// if (process.env.ENVIROMENT !== "dev") {
//     // app.use(HttpsRedirect)
// }

/// for react need to set origin allowed
// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         credentials: true,
//     })
// );
// app.use(MethodOverride("_method"));

app.set("view engine", "ejs"); // for template
app.use(express.static("public")); //use templates from folder
app.use(express.urlencoded({ extended: true })); //get body data
app.use(express.json());

//Sessions
//express sessions must be before passport
// app.use(
//     session({
//         //! change secret
//         secret: process.env.sessionSecret,
//         rolling: true, //refresh token every time user interacts
//         resave: false,
//         saveUninitialized: false, //dont create until something to save
//         store: MongoStore.create({
//             mongoUrl: process.env.connectStr,
//         }),
//         cookie: {
//             maxAge: 15 * 60 * 1000,
//             secure: false, //needs false local dev enviroment
//         },
//     })
// );

//passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

//// ROUTES
app.get("/", (req, res) => {
    res.send("server working");
});

// app.listen(process.env.PORT || PORT, () => {
//     console.log(`server on ${PORT}`);
// });

export default app;