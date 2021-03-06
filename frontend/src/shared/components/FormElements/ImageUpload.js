import React, { useRef, useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import Button from './Button';
import './ImageUpload.css';
import { IconButton } from '@material-ui/core';

export const ImageUpload = (props) => {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [fileIsValid, setFileIsValid] = useState(props.fileIsValid);
  const [previewURL, setPreviewURL] = useState(props.previewURL || null);

  useEffect(() => {
    if (file) {
      try {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewURL(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      } catch (err) {}
    } else {
      setFile();
    }
  }, [file]);

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
    event.target.value = '';
  };

  const imageUploadHandler = () => {
    inputRef.current.click();
  };

  const removePickedImageHandler = () => {
    setFile();
    setPreviewURL();
    setFileIsValid(false);
    props.onInput(props.id, null, false);
  };

  return (
    <div>
      <div className='image-upload__preview'>
        {previewURL && fileIsValid && (
          <IconButton
            className='close-img-btn'
            style={{ position: 'absolute' }}
            onClick={removePickedImageHandler}
          >
            <CloseIcon />
          </IconButton>
        )}
        {previewURL && fileIsValid && <img src={previewURL} alt='preview' />}
        {/* {!previewURL && <p>{props.errorText}</p>} */}
        {!previewURL && (
          <Button onClick={imageUploadHandler}>Upload Image</Button>
        )}
      </div>
      <input
        id={props.id}
        ref={inputRef}
        type='file'
        accept='.jpg,.png,.jpeg'
        style={{ display: 'none' }}
        onChange={imagePickedHandler}
      />
    </div>
  );
};
