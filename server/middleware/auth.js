module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            //if authenticated is truthy next()
            console.log(`authenticated?`, req.isAuthenticated());
            return next();
        } else {
            //else send to login at root
            console.log(`authenticated?`, req.isAuthenticated());
            res.redirect("/login");
        }
    },
    ensureAuthApi: function (req, res, next) {
        if (req.isAuthenticated()) {
            //if authenticated is truthy next()
            console.log(`authenticated?`, req.isAuthenticated());
            return next();
        } else {
            //else send to login at root
            console.log(`authenticated?`, req.isAuthenticated());
            res.status(400).json({ isLoggedIn: false });
        }
    },
    ensureGuest: function (req, res, next) {
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
