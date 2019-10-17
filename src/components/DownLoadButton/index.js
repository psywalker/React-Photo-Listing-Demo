import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import {
  Button,
  Icon,
} from 'antd';
import handleDowloadPhoto from '../../utils/handleDowloadPhoto';
import './index.scss';

const DownLoadButton = memo(({
  altDescriprion,
  photoDesc,
  photoSrc,
  textButton = null,
}) => {
  console.log("1: ", altDescriprion, photoDesc, photoSrc)
  console.log("2: ", photoDesc)
  console.log("3: ", photoSrc)
  const downLoadPhoto = () => {
    const photoName = handleDowloadPhoto(altDescriprion, photoDesc);
    saveAs(photoSrc, photoName);
  };
  return (
    <div
      data-test="downloadButtonContainer"
      className="download-button"
    >
      <Button
        data-test="downloadButton"
        className="download-button__btn"
        onClick={downLoadPhoto}
      >
        <Icon
          data-test="downloadButtonIcon"
          className="download-button__icon"
          type="download"
        />
        { textButton }
      </Button>
    </div>
  );
});

DownLoadButton.propTypes = {
  altDescriprion: PropTypes.string,
  photoDesc: PropTypes.string,
  photoSrc: PropTypes.string,
  textButton: PropTypes.string,
};
DownLoadButton.defaultProps = {
  altDescriprion: '',
  photoDesc: '',
  photoSrc: '',
  textButton: '',
};

export default DownLoadButton;
