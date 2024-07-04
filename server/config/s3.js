const { S3Client } = require('@aws-sdk/client-s3');
require("dotenv").config();

const s3 = new S3Client({
    region: process.env.PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.PUBLIC_AWS_ACCESS_KEY,
        secretAccessKey: process.env.PUBLIC_AWS_SECRET_KEY
    }
})
module.exports ={ s3 }