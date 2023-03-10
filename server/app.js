import express from "express";
const app = express();
import { mainRoutes } from "./routes/main.mjs";
// const mainR = express.Router();

// const mongoose = require("mongoose");
// const flash = require("express-flash");

///authentication packages
// const passport = require("passport");
import passport from "passport";
// const MongoStore = require("connect-mongo"); //session store
import MongoStore from "connect-mongo";
// const session = require("express-session");
import session from "express-session";

import morgan from "morgan";

import cors from "cors";
// const MethodOverride = require("method-override");
// const HttpsRedirect = require('./middleware/httpsRedirect')//!not used yet

//enviroment vars
/// require("dotenv").config({ path: "./config/.env" });
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
/// passport config
/// require("./config/passport")(passport);

import passportConfig from "./config/passport.mjs";
passportConfig(passport);

const PORT = 8000;

// import connectDB from "./config/db";
// connectDB();

//authentication middleware
// import { ensureAuth, ensureGuest } from "./middleware/auth";
// import { apiEnsureAuth } from "./middleware/apiAuth";

// if (process.env.ENVIROMENT !== "dev") {
//     // app.use(HttpsRedirect)
// }

app.use(morgan("tiny"));
/// for react need to set origin allowed
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
// app.use(MethodOverride("_method"));

app.use(express.static("public")); //use templates from folder
app.use(express.urlencoded({ extended: true })); //get body data
app.use(express.json());

//Sessions
// express sessions must be before passport
app.use(
    session({
        //! change secret
        secret: process.env.sessionSecret,
        rolling: true, //refresh token every time user interacts
        resave: false,
        saveUninitialized: false, //dont create until something to save
        store: MongoStore.create({
            mongoUrl: process.env.connect_string,
        }),
        cookie: {
            maxAge: 15 * 60 * 1000,
            secure: false, //needs false local dev enviroment
        },
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//// ROUTES

app.use("/login", mainRoutes);

app.use("/", (req, res) => {
    res.send("server working");
});
export default app;
