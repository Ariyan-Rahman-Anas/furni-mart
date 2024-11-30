import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Helper function to upload images to Cloudinary
export const uploadImagesToCloudinary = async (files) => {
  const uploadedImages = await Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        // Create a Readable stream from the file buffer
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null); // End of the stream

        // Cloudinary upload stream
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products" }, // Folder in Cloudinary
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        // Pipe the readable stream to Cloudinary's upload stream
        readableStream.pipe(uploadStream);
      });
    })
  );

  return uploadedImages.map((img) => ({
    public_id: img.public_id,
    url: img.secure_url,
  }));
};