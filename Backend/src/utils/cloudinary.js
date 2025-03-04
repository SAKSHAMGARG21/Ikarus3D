import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath, folder = process.env.CLOUDINARY_FOLDER_NAME) => {
    try {
        if (!localFilePath) return null;
        console.log(localFilePath);
        const options = { folder };
        options.resource_type = 'auto';
        // upload the file 
        const response = await cloudinary.uploader.upload(localFilePath, options)
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.log("Error in cloudinary",error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation is failed    
        return null;
    }
}


export { uploadOnCloudinary };


// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function(error, result) {console.log(result); });