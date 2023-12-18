import cloudinary from "../configs/cloudinaryConfig.js";

export const uploadVideo = async (req, res, next) => {
  console.log(req.file);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const results = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "tiktak-videos",
    });

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};
