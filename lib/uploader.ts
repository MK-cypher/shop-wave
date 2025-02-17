"use server";

import {v2 as cloudinary} from "cloudinary";

const configureCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SERCRET,
  });
  return cloudinary;
};

export default configureCloudinary;
