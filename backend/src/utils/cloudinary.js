import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import { env } from 'process';


cloudinary.config({ 
  cloud_name: env.CLOUDINARY_NAME, 
  api_key: env.CLOUDINARY_API_KEY, 
  api_secret: env.CLOUDINARY_API_SECRET
});

const uploadFileToCloudinary = async (localFilePath) => {
    try {
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        fs.unlinkSync(localFilePath)        
        return res
    } catch (error) {
        fs.unlinkSync(localFilePath)
        
    }
}

export default uploadFileToCloudinary;