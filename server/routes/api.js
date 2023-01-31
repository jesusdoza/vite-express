const Router = require("express").Router();
const apiController = require("../controllers/apiController.js");
const { ensureAuthApi } = require("../middleware/auth");

const apiAuthController = require("../controllers/apiAuthController");

/// @route /api/*
Router.post("/test", ensureAuthApi, apiController.test);
Router.get("/test", ensureAuthApi, apiController.test);
Router.put("/test", ensureAuthApi, apiController.test);
Router.delete("/test", ensureAuthApi, apiController.test);

Router.get("/", ensureAuthApi, apiController.getInventory);
Router.post("/", ensureAuthApi, apiController.addItem);
Router.delete("/", ensureAuthApi, apiController.removePart);
Router.put("/update", ensureAuthApi, apiController.updatePart);

Router.post("/login", apiAuthController.postLogin);
Router.get("/logout", apiAuthController.logout);

Router.post("/signup", apiAuthController.postSignup);

Router.get("/status", ensureAuthApi, apiAuthController.isLoggedIn);

module.exports = Router;
