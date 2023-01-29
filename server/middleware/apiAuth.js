module.exports = {
    apiEnsureAuth: function (req, res, next) {
        console.log("api auth check", req.isAuthenticated);
        if (req.isAuthenticated()) {
            //if authenticated is truthy next()
            // console.log(`authenticated?`,req.isAuthenticated())
            return next();
        } else {
            // console.log(`authenticated?`,req.isAuthenticated())
            res.status(500).json({ message: "not logged in" });
        }
    },
    apiEnsureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            // already authenticated send to dashboard
            console.log(`authenticated?`, req.isAuthenticated());
            res.redirect("/inventory");
        } else {
            //else go to next
            console.log(`authenticated?`, req.isAuthenticated());
            return next();
        }
    },
};
