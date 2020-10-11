import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import { Loading } from './PlayingMusicAnimation';

const UploadArticleImage = ({
  defaultImage,
  uploadText,
  changeText,
  afterUpload,
}) => {
  const MAX_IMG_SIZE = 1000000; //500kb

  // HOOKS
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const onChangeHandler = (event) => {
    setLoading(true);
    setMessage(null);
    const file = event.target.files[0];
    if (file.size > MAX_IMG_SIZE) {
      setMessage(
        `'${file.name}' is too large, please pick a file smaller than ${
          MAX_IMG_SIZE / 1000
        }kb`
      );
      setLoading(false);
    } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      setMessage(
        "Unsupported format. Only '.png' and '.jpg' files are supported"
      );
      setLoading(false);
    } else {
      const data = new FormData();
      data.append('image', file);

      axios
        .post('/api/v1/upload-article-image', data, {
          headers: { 'x-access-token': getTokenFromStore() },
        })
        .then(function (response) {
          const { status, data } = response;
          if (status === 200) {
            console.log('data', data);
            setImage(data.file.secure_url);
            afterUpload(data.file.secure_url);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setMessage(error.response.data.message);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="custom-file">
        <input
          className="custom-file-input"
          id="image"
          onChange={onChangeHandler}
          type="file"
        />
        <label className="custom-file-label" htmlFor="image">
          {loading ? (
            <>
              <Loading /> &nbsp; &nbsp; Uploading Image
            </>
          ) : image || defaultImage ? (
            changeText || 'Change Image'
          ) : (
            uploadText || 'Upload New Image'
          )}
        </label>
      </div>
      <div className="invalid-feedback">{message}</div>
    </>
  );
};

UploadArticleImage.propTypes = {
  afterUpload: PropTypes.func,
  changeText: PropTypes.string,
  defaultImage: PropTypes.string,
  uploadText: PropTypes.string,
};

UploadArticleImage.defaultProps = {
  afterUpload: () => {},
  uploadText: null,
  defaultImage: null,
  changeText: null,
};

export default UploadArticleImage;
