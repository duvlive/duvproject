import React, { useState } from 'react';
import axios from 'axios';
// import ProfileAvatar from 'assets/img/avatar/profile.png';
import { getToken } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';

const UploadImage = () => {
  const MAX_IMG_SIZE = 500000; //500kb

  // Context
  let { userState, userDispatch } = React.useContext(UserContext);

  // HOOKS
  const [message, setMessage] = useState(null);
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
        .post('/api/v1/upload-profile-image', data, {
          headers: { 'x-access-token': getToken() }
        })
        .then(function(response) {
          const { status, data } = response;
          // handle success
          console.log(status, data);
          if (status === 200) {
            console.log('data', data);
            userDispatch({
              type: 'update-profile-image',
              link: data.image.url
            });
            setLoading(false);
          }
        })
        .catch(function(error) {
          console.log('error', error.response.data);
          setMessage(error.response.data.message);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="upload-button">
        {userState.profileImg && (
          <img alt="profile" src={userState.profileImg} />
        )}
        <input id="image" onChange={onChangeHandler} type="file" />
        <label
          className="btn btn-info btn-wide btn-transparent"
          htmlFor="image"
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm">&nbsp;</span>
              <span className="d-inline-block ml-2">Uploading</span>
            </>
          ) : userState.profileImg ? (
            'Change Image'
          ) : (
            'Upload Image'
          )}
        </label>
      </div>
      <div className="invalid-feedback">{message}</div>
    </>
  );
};

export default UploadImage;
