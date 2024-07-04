const { Rolemodel } = require("../models/roleModel");

const authorize = ( heading, subHeading, access) => {
    return async (req, res, next) => {
        try {
            const role = await Rolemodel.findOne({ _id: req.body.roleID });

            if (!role) {
                return res.status(401).json({ message: "Role Not Found" });
            }

            const headingType = role.roleAccess.find(item => item.heading === heading);

            if (!headingType) {
                return res.status(401).json({ message: "You Are Not Authorized" });
            }

            const type = headingType.types.find(item => item.name === subHeading);

            if (!type) {
                return res.status(401).json({ message: "You Are Not Authorized" });
            }

            if (type.access.length === 4 || type.access.includes(access)) {
                next();
            } else {
                return res.status(401).json({ message: "You Are Not Authorized" });
            }
        } catch (error) {
            console.error("Error from authorize Middleware",error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};




module.exports = {
    authorize
}