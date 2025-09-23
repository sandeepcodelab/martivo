import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "martivo",
      resource_type: "auto",
    });

    console.log("File uploaded successfully. File src: " + response.url);

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);

    return null;
  }
};

const deleteFromCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log("Deleted from cloudinary: ", result);
  } catch (error) {
    console.log("Failed to delete from cloudinary: ", result);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
