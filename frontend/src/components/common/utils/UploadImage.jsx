import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const MAX_IMG_SIZE = 500000; //500kb

  // HOOKS
  const [message, setMessage] = useState(null);

  const onChangeHandler = event => {
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
        .post('/api/v1/image-upload', data)
        .then(function(response) {
          const { status, data } = response;
          // handle success
          console.log(status, data);
          if (status === 200) {
            console.log('data', data);
            // setSelectedImage()
          }
        })
        .catch(function(error) {
          console.log('error', error.response.data);
          setMessage(error.response.data.message);
        });
    }
  };
  return (
    <form>
      <div className="upload-button">
        <input id="image" onChange={onChangeHandler} type="file" />
        <label
          className="btn btn-info btn-wide btn-transparent"
          htmlFor="image"
        >
          Upload Image
        </label>
      </div>
      <div className="invalid-feedback">{message}</div>
    </form>
  );
};

export default UploadImage;
