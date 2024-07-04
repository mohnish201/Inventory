const bcrypt = require("bcrypt");
require("dotenv").config();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

async function generateHash(itemToHash) {
    return await bcrypt.hash(itemToHash, SALT_ROUNDS);
}

async function compareHash(valueByUser, valueStored) {
    return await bcrypt.compare(valueByUser, valueStored);
}

module.exports = {
    generateHash,
    compareHash,
};