const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const { Blacklistmodel } = require("../models/blacklistTokenModel");

const authenticate = async (req, res, next) => {
    // console.log("helllo", req.headers);

    const token = req.headers?.authorization?.split(" ")[1];

    try {
        if (token) {
            const tokenValidation = await Blacklistmodel.findOne({ token });

            if (tokenValidation) {
                return res.status(401).json({ message: "Login again" });
            }

            jwt.verify(token, process.env.KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Token Invalid!" });
                } else {
                    const { userId, email, roleID } = decoded;

                    req.body.userId = userId;
                    req.body.userEmail = email;
                    req.body.roleID = roleID;

                    next();
                }
            });
        } else {
            res.status(401).json({ message: "Login please!!" });
        }
    } catch (error) {
        console.log("Error from authenticate middleware:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    authenticate
};
