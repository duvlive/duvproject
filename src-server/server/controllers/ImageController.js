require('dotenv').config();
const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'profile',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 250, height: 250, crop: 'limit' }]
});

const MAX_IMG_SIZE = 500000; //500kb

export const parser = multer({
  limits: { fileSize: MAX_IMG_SIZE },
  storage: storage
}).single('image');

const ImageController = {
  uploadImage(req, res, next) {
    parser(req, res, err => {
      if (err) {
        return res.status(412).json({ message: err.message });
      }
      next();
    });
  },
  /**
   * create Contact
   * @function
   * @param {object} req is req object
   *  - Query
   *    - name * - derived from the keys in Image CONTENT
   *    - type - text || html
   * @param {object} res
   * @return {object} returns - json || text || html
   */
  saveImage(req, res) {
    // console.log(req.file); // to see what is returned to you
    if (req.file) {
      const image = {};
      image.url = req.file.url;
      image.id = req.file.public_id;
      // Delete previous image if present
      const previousImage = req.query.previousImage;
      previousImage && cloudinary.uploader.destroy(previousImage);
      return res.json({ image });
    } else {
      return res.status(412).json({ message: 'Image cannot be uploaded' });
    }
  }

  // getImage()
};

export default ImageController;
