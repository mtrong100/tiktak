export const uploadVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided." });
    }

    cloudinary.uploader
      .upload_stream({ resource_type: "video" }, (error, result) => {
        if (error) {
          return next(error);
        }

        res
          .status(200)
          .json({ message: "Video uploaded successfully", data: result });
      })
      .end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};
