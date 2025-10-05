
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary config in use:", cloudinary.config());


const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Dot Env inside try: ", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_SECRET, process.env.CLOUDINARY_API_KEY);
    if (!localFilePath) return null;
    //upload the file on cloudinary
    //response (uploadResult of cloudinary)
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log(response);
    return response; //return to user
  } catch (error) {
    console.log("Dot Env inside catch: ", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_SECRET, process.env.CLOUDINARY_API_KEY);
    console.log("Cloudinary upload error:", error);
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export {uploadOnCloudinary}
