const { s3 } = require("../config/s3");
require("dotenv").config();

const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { v4 } = require("uuid");
const uuid = v4;

const pushObject = async (file) => {

    // const file = fomrData.get('file');

    const extention = file.originalname.split('.').pop();
    let buffer = file.buffer;

    const params = {
        Bucket: process.env.PUBLIC_AWS_BUCKET_NAME,
        Key: `images/${uuid()}.${extention}`.split('-').join(''),
        Body: buffer,
        ContentType: 'image/*'
    }

    const pubObjectCommand = new PutObjectCommand(params);

    try {
        await s3.send(pubObjectCommand);
        const url = `${process.env.PUBLIC_AWS_BASE_URL}/${params.Key}`
        return { url,key:params.Key }
    } catch (error) {
        throw new Error(error.message);
    }
}

const pushObjects = async (files) => {
    const uploadedImages = [];

    try {
        for (const file of files) {
            const extension = file.originalname.split('.').pop();
            const buffer = file.buffer;
            const key = `images/${uuid()}.${extension}`.split('-').join('');

            const params = {
                Bucket: process.env.PUBLIC_AWS_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: 'image/*'
            };

            const putObjectCommand = new PutObjectCommand(params);
            await s3.send(putObjectCommand);

            const url = `${process.env.PUBLIC_AWS_BASE_URL}/${key}`;
            uploadedImages.push({ url, key });
        }

        return uploadedImages;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateObject = async (file,key) => {

    const extention = file.originalname.split('.').pop();
    let buffer = file.buffer;

    const params = {
        Bucket: process.env.PUBLIC_AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: 'image/*'
    }

    const pubObjectCommand = new PutObjectCommand(params);

    try {
        await s3.send(pubObjectCommand);
        return { key }
    } catch (error) {
        throw new Error(error.message);
    }
}



const removeObject = async (key) => {


    const params = {
        Bucket: process.env.PUBLIC_AWS_BUCKET_NAME,
        Key: key,
    }

    const deleteObejctCommand = new DeleteObjectCommand(params);

    try {
        await s3.send(deleteObejctCommand);
        return { key }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { pushObject,pushObjects, updateObject, removeObject }