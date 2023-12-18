import multer from "multer";
import cloudinary from "../configs/cloudinaryConfig.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tiktak-videos",
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
