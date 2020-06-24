import { Video, User, EntertainerProfile } from '../models';
import { getAll, validString } from '../utils';
import { MEDIA_TYPES } from '../constant';

const VideoController = {
  /**
   * save video
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  saveVideo(req, res) {
    const userId = req.decoded.userId;
    const { title, youtubeID } = req.body;

    const error = {
      ...validString(title),
      ...validString(youtubeID),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    return Video.create({ title, youtubeID, userId })
      .then((video) => {
        return res.status(200).json({
          message: 'Video has been successfully upload',
          video,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  getEntertainerVideo(req, res) {
    return Video.findAll({
      where: { userId: req.user.id },
      order: [['updatedAt', 'DESC']],
    })
      .then((result) => res.json({ videos: result }))
      .catch((error) => res.status(412).json({ msg: error.message }));
  },

  /**
   * approve video
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  approveVideo(req, res) {
    const { id, approve } = req.params;
    const approveVideo = approve === 'approve';
    const approval = {
      value: approveVideo,
      type: approveVideo ? 'approved' : 'disapproved',
    };

    Video.findOne({
      where: { id },
    })
      .then(() => {
        return Video.update(
          { approved: approval.value },
          {
            where: {
              id,
            },
          }
        )
          .then(() =>
            res.status(200).json({ message: `Video has been ${approval.type}` })
          )
          .catch(() => {
            return res.status(404).json({ message: 'Video not found' });
          });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * @desc Deletes video
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  deleteVideo(req, res) {
    const { id } = req.params;
    return Video.findOne({ where: { id } })
      .then((result) => {
        if (result) {
          const { id } = result;
          result
            .destroy({ where: { id } })
            .then(() => {
              return res.status(202).json({
                msg: `Video has been successfully deleted`,
              });
            })
            .catch((error) => {
              res.status(412).json({ msg: error.message });
            });
        } else {
          res.status(404).json({ msg: 'Video does not exist' });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  /**
   * get videos
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  async getVideos(req, res) {
    const { offset, limit, userId, approved } = req.query;

    try {
      let videoQuery = {};
      if (userId) {
        videoQuery.userId = userId;
      }
      if (
        approved &&
        Object.prototype.hasOwnProperty.call(MEDIA_TYPES, approved)
      ) {
        videoQuery.approved = MEDIA_TYPES[approved];
      }
      const options = {
        offset: offset || 0,
        limit: limit || 10,
        where: videoQuery,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            include: [
              {
                model: EntertainerProfile,
                as: 'profile',
                attributes: ['stageName', 'slug'],
              },
            ],
          },
        ],
      };
      try {
        const { result, pagination } = await getAll(Video, options);
        return res.status(200).json({
          result,
          pagination,
        });
      } catch (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },
};

export default VideoController;
