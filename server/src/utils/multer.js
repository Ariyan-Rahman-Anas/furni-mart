import multer from "multer";

// Use Multer's memory storage to keep file data in memory (required for Cloudinary)
const storage = multer.memoryStorage();

// Multer middleware to handle file uploads
const upload = multer({ storage });

// Middleware to handle multiple file uploads
export const multerMiddleware = upload.array("images"); // Use "images" as the field name


export const config = {
    api: {
        bodyParser: false, // Disable body parser
    },
};