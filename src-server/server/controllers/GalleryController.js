require('dotenv').config();
import { Gallery } from '../models';

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
  folder: 'gallery',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 1200, height: 800, crop: 'limit' }]
});

const MAX_IMG_SIZE = 1000000; //1MB

export const parser = multer({
  limits: { fileSize: MAX_IMG_SIZE },
  storage: storage
}).single('image');

const GalleryController = {
  uploadImage(req, res, next) {
    parser(req, res, err => {
      if (err) {
        return res.status(412).json({ message: err.message });
      }
      next();
    });
  },

  /**
   * save image
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  saveImage(req, res) {
    // console.log(req.file); // to see what is returned to you
    if (req.file) {
      const gallery = {};
      gallery.userId = req.decoded.userId;
      gallery.imageURL = req.file.url;
      gallery.imageID = req.file.public_id;

      return Gallery.create(gallery)
        .then(details => {
          return res.status(200).json({
            message: 'Image has been successfully upload',
            details
          });
        })
        .catch(error => {
          const status = error.status || 500;
          const errorMessage = error.message || error;
          return res.status(status).json({ message: errorMessage });
        });
    } else {
      return res.status(412).json({ message: 'Image cannot be uploaded' });
    }
  },

  getEntertainerGallery(req, res) {
    return Gallery.findAll({
      where: { userId: req.params.userId },
      order: [['updatedAt', 'DESC']]
    })
      .then(result => res.json(result))
      .catch(error => res.status(412).json({ msg: error.message }));
  },

  /**
   * approve imave
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  approveImage(req, res) {
    const { id, approve } = req.params;
    const approveImage = approve === 'approve';
    const approval = {
      value: approveImage,
      type: approveImage ? 'approved' : 'disapproved'
    };

    Gallery.findOne({
      where: { id }
    })
      .then(foundImage => {
        if (!foundImage && !foundImage.imageURL) {
          return res.status(404).json({ message: 'Image does not exist' });
        }

        return Gallery.update(
          { approved: approval.value },
          {
            where: {
              id
            }
          }
        ).then(() =>
          res.status(200).json({ message: `Image has been ${approval.type}` })
        );
      })
      .catch(error => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * @desc Deletes image
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  deleteImage(req, res) {
    const { id } = req.params;
    return Gallery.findOne({ where: { id } })
      .then(result => {
        if (result) {
          const { id, imageID } = result;
          result
            .destroy({ where: { id } })
            .then(() => {
              id && cloudinary.uploader.destroy(imageID);
              return res.status(202).json({
                msg: `Image has been successfully deleted`
              });
            })
            .catch(error => {
              res.status(412).json({ msg: error.message });
            });
        } else {
          res.status(404).json({ msg: 'Image does not exist' });
        }
      })
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  }
};

export default GalleryController;
