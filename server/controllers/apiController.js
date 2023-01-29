const { response } = require("express");
const Parts = require("../models/Part");
const Items = require("../models/Item");
const { update } = require("../models/User");

module.exports.test = async (req, res) => {
    console.log(req.body);
    console.log(
        `if null console empty`,
        req.body.model ? "has stuff" : "empty"
    );

    res.status(200).send("ok");
};

module.exports.getInventory = async (req, res) => {
    try {
        //get all inventory that matches the groups user is a part of
        const allInventory = await Items.find({
            groups: { $in: req.user.groups },
        });
        console.log(req.body);
        // console.log(req.user)
        console.log(allInventory);
        res.json({
            inventory: allInventory,
        });
    } catch (error) {
        console.log(`error getting inventory`, error);
        res.status(500).json({ message: "error getting inventory" });
    }
};

module.exports.addItem = async (req, res) => {
    console.log(req.body);
    try {
        const newItem = await Items.create({
            partnumber: req.body.partnumber,
            model: req.body.model,
            enginemake: req.body.enginemake,
            instock: req.body.instock,
            groups: [req.user.username],
            createdBy: req.user.username,
            // cores:,
            // warranty:,
            // problem:,
        });
        console.log("new item made ", newItem);
        res.json(newItem);
    } catch (error) {
        console.log(`error adding to inventory`, error);
        res.status(400).json({ message: "error getting inventory" });
    }
};

//todo REMOVE
module.exports.removePart = async (req, res) => {
    console.log(`remove part`);
    try {
        //find specific entry
        const foundPart = await Parts.findOne(
            //query
            {
                partnumber: req.body.partnumber,
            }
        );

        if (!foundPart) {
            res.status(400).json({ message: "part not found" });
        }

        console.log(`found part is `, foundPart);

        const result = await Parts.deleteOne({ _id: foundPart._id });

        console.log(result);
        res.redirect("/");
    } catch (error) {
        console.log("error at delete", error);

        res.status(505).json({ message: "error deleting" });
    }
};

//todo UPDATE
module.exports.updatePart = async (req, res) => {
    // console.log("api/update", req.body);
    const { _id, groups, createdBy, ...updateFeilds } = req.body;
    // console.log("updateFeildsest", updateFeilds);
    try {
        let foundPart = await Parts.findOne(
            //query
            {
                _id: req.body._id,
            }
        );
        if (!foundPart) {
            res.status(400).json({ message: "part not found" });
        }

        console.log(`found part`, foundPart);

        for (const property in updateFeilds) {
            foundPart[property] = updateFeilds[property];
        }
        foundPart.save();

        console.log(`updated part`, foundPart);
        // ! set the update or maybe use the save by updating individual properties?
        res.status(200).json({ "message:": "success" });
    } catch (error) {
        console.log("error at update", error);
        res.status(505).json({ message: "error updating", item: req.body });
    }
};
