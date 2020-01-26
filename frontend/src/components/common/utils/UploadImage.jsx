import React, { useState } from 'react';
import axios from 'axios';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { getToken, getCurrentUser, storeCurrentUser } from 'utils/localStorage';

const UploadImage = () => {
  const MAX_IMG_SIZE = 500000; //500kb

  // HOOKS
  const [message, setMessage] = useState(null);
  const [imgSrc, setImgSrc] = useState(
    getCurrentUser().profileImgURL || ProfileAvatar
  );
  const [loading, setLoading] = useState(false);

  const onChangeHandler = event => {
    setLoading(true);
    setMessage(null);
    const file = event.target.files[0];
    console.log('file', file);
    if (file.size > MAX_IMG_SIZE) {
      setMessage(
        `'${
          file.name
        }' is too large, please pick a file smaller than ${MAX_IMG_SIZE /
          1000}kb`
      );
    } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      setMessage(
        "Unsupported format. Only '.png' and '.jpg' files are supported"
      );
    } else {
      const data = new FormData();
      data.append('image', file);

      axios
        .post('/api/v1/upload-profile-image', data, {
          headers: { 'x-access-token': getToken() }
        })
        .then(function(response) {
          const { status, data } = response;
          // handle success
          console.log(status, data);
          if (status === 200) {
            console.log('data', data);
            setImgSrc(data.image.url);
            const user = getCurrentUser();
            user.profileImgURL = data.image.url;
            storeCurrentUser(user);
            setLoading(false);
          }
        })
        .catch(function(error) {
          console.log('error', error.response.data);
          setMessage(error.response.data.message);
          setLoading(false);
        });
    }
    setLoading(false);
  };

  return (
    <form>
      <div className="upload-button">
        {imgSrc && <img alt="profile" src={imgSrc} />}
        <input id="image" onChange={onChangeHandler} type="file" />
        <label
          className="btn btn-info btn-wide btn-transparent"
          htmlFor="image"
        >
          {loading ? (
            <span class="spinner-border spinner-border-sm">&nbsp;</span>
          ) : imgSrc ? (
            'Change Image'
          ) : (
            'Upload Image'
          )}
        </label>
      </div>
      <div className="invalid-feedback">{message}</div>
    </form>
  );
};

export default UploadImage;
