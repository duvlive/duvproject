require('dotenv').config();
import { User } from '../models';

const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'profile',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 256, height: 256, crop: 'limit' }],
});

const MAX_IMG_SIZE = 500000; //500kb

const articleStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'public-event',
  allowedFormats: ['jpg', 'png'],
});
const ARTICLE_MAX_IMG_SIZE = 1000000; // 1MB

export const parser = multer({
  limits: { fileSize: MAX_IMG_SIZE },
  storage: storage,
}).single('image');

export const parserArticle = multer({
  limits: { fileSize: ARTICLE_MAX_IMG_SIZE },
  storage: articleStorage,
}).single('image');

const ImageController = {
  uploadImage(req, res, next) {
    parser(req, res, (err) => {
      if (err) {
        return res.status(412).json({ message: err.message });
      }
      next();
    });
  },

  uploadArticleImage(req, res, next) {
    parserArticle(req, res, (err) => {
      if (err) {
        return res.status(412).json({ message: err.message });
      }
      next();
    });
  },

  getUploadedImage(req, res) {
    if (req.file) {
      return res.json({ file: req.file });
    }
    return res.status(412).json({
      success: false,
      message: 'Image cannot be uploaded',
    });
  },

  saveImage(req, res) {
    // console.log(req.file); // to see what is returned to you
    if (req.file) {
      const { userId } = req.decoded;
      User.findOne({
        where: { id: userId },
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'User not found',
            });
          }

          // get upload image
          const previousImageID = user.profileImageID;
          const image = {};
          image.url = req.file.url.replace(/^http:\/\//i, 'https://');
          image.id = req.file.public_id;

          // update profile image in database
          return user
            .update({ profileImageID: image.id, profileImageURL: image.url })
            .then(() => {
              // Delete previous image if present
              previousImageID && cloudinary.uploader.destroy(previousImageID);
              return res.json({ image });
            });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    } else {
      return res.status(412).json({ message: 'Image cannot be uploaded' });
    }
  },

  // getImage()
};

export default ImageController;
