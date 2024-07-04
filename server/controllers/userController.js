const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { Usermodel } = require("../models/userModel");
const { Blacklistmodel } = require("../models/blacklistTokenModel");
const { generateHash, compareHash } = require("../utils/hash");
require("dotenv").config();

const addUser = async (req, res) => {
    let { name, email, roleId, password } = req.body;

    try {
        const existingUser = await Usermodel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await generateHash(password);
        if (hashPassword) {
            let newUser = new Usermodel({
                name,
                email,
                roleId,
                password: hashPassword
            })
            await newUser.save();
            res.status(201).json({ message: "New User Added!" })
        } else {
            return res.status(500).json({ message: "Internal Server error" });
        }
    } catch (error) {
        console.log("Error while adding new User", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Usermodel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up." });
        }

        const comparePassword = await compareHash(password, user.password);

        if (comparePassword) {
            const token = jwt.sign({ userId: user._id, email: user.email, roleID: user.roleId }, process.env.KEY);
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'incorrect password' });
        }
    } catch (error) {
        console.log("Error while logging in:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const getAllUsers = async (req, res) => {
    const { page = 1, limit = 0 } = req.query;
    // Convert page to a number
  const pageNumber = parseInt(page);
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "roleDetails",
                },
            },
            {
                $unwind: "$roleDetails",
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    "roleDetails.roleName": 1,
                    "roleDetails._id": 1,
                    createdAt: 1,
                },
            },
            {
                $skip: (pageNumber - 1) * parseInt(limit) || 0,
            }

        ];

        if (parseInt(limit)) {
            pipeline.push({
                $limit: parseInt(limit),
            });
        }
        const allUsers = await Usermodel.aggregate(pipeline);
        const total = await Usermodel.countDocuments();
        if (limit != 0) {
            pageEnd = Math.ceil(total / parseInt(limit));
        } else {
            pageEnd = 1;
        }

        res.status(200).json({ message: "All Users", data: allUsers, pageEnd });
    } catch (error) {
        console.log("Error while getting all the Users", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const editUserDetails = async (req, res) => {
    const { ID } = req.params;
    const { password } = req.body
    const payload = req.body;

    try {

        if (password) {
            const user = await Usermodel.findById(ID);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const hashPassword = await generateHash(password);
            if (hashPassword) {
                user.password = hashPassword;
                await user.save();
                return res.status(200).json({ message: "Password updated successfully" });
            } else {
                return res.status(500).json({ message: "Internal Server error" });
            }
        } else {
            const updatedUser = await Usermodel.findByIdAndUpdate(
                ID,
                payload,
                { new: true, runValidators: true }
            );

            // Check if the user exists
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Respond with the updated user
            return res.status(200).json({ message: 'User details updated successfully' });
        }


    } catch (error) {
        console.error("Error while editing details of user", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removeUser = async (req, res) => {
    const { ID } = req.params;

    try {

        const deletedUser = await Usermodel.findByIdAndDelete(ID);

        if (deletedUser) {
            // If the user was found and deleted successfully
            return res.status(200).json({ success: true, message: "User deleted successfully" });
        } else {

            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error while removing user", error);
        return res.status(500).json({
            success: false, message: 'Internal Server Error'
        });
    }
};

const validateToken = async (req, res) => {
    let { userId } = req.body;
    try {
        let userDetails = await Usermodel.findOne({ _id: userId });
        res.status(200).json({ message: "User details", data: userDetails })
    } catch (error) {
        console.log("Error while getting user details", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const logout = async (req, res) => {
    let token = req.cookies.session;
    try {
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        // Find the existing blacklist document or create a new one if it doesn't exist,
        // and add the token to the array
        const updatedBlacklist = new Blacklistmodel({ token });
        await updatedBlacklist.save();

        res.clearCookie(`session`, { domain: process.env.COOKIE_DOMAIN });
        res.redirect(process.env.ADMIN_HOSTED_URL);
    } catch (error) {
        console.error("Error adding token to blacklist i.e: while user logout:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



module.exports = {
    addUser,
    userLogin,
    getAllUsers,
    editUserDetails,
    removeUser,
    validateToken,
    logout
};
