import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';

export const ImageUpload = (props) => {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [fileIsValid, setFileIsValid] = useState(false);
  const [previewURL, setPreviewURL] = useState();

  useEffect(() => {
    if (file) {
      try {
        const fileReader = new FileReader();
        fileReader.onload((err) => setPreviewURL(fileReader.result));
        fileReader.readAsDataURL(file);
      } catch (err) {}
    } else {
      setFile();
      setPreviewURL();
    }
  }, [props.onInput, props.id, file]);

  const imagePickedHandler = (event) => {
    let image;
    let isValidImage = false;
    if (event.target.files && event.target.files.length === 1) {
      image = event.target.files[0];
      isValidImage = true;
      setFile(image);
    } else {
      setFile();
    }
    setFileIsValid(isValidImage);
    props.onInput(props.id, image, isValidImage);
  };

  const imageUploadHandler = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <div>
        {previewURL && fileIsValid && <img src={previewURL} alt='preview' />}
      </div>
      <input
        id={props.id}
        ref={inputRef}
        type='file'
        accept='.jpg,.png,.jpeg'
        style={{ display: 'none' }}
        onChange={imagePickedHandler}
      />
      <Button onClick={imageUploadHandler}>Upload Image</Button>
    </div>
  );
};
