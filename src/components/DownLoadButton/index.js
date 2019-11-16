import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'antd';
import DownloadSizesPopover from '../DownloadSizesPopover';
import './index.scss';

const DownLoadButton = memo(({
  altDescriprion,
  photoDesc,
  placement,
  textButton = null,
  photoUrlSizes,
  userID,
  title,
}) => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const containerStyle = {
    display: buttonVisible ? 'block' : null,
  };
  const handleVisibleButtonChangeFalse = () => {
    setButtonVisible(false);
  };
  const handleVisibleButtonChange = () => {
    setButtonVisible(!buttonVisible);
  };
  return (
    <div
      data-test="downloadButtonContainer"
      className="download-button"
      style={containerStyle}
    >
      <DownloadSizesPopover
        photoUrlSizes={photoUrlSizes}
        userID={userID}
        title={title}
        altDescriprion={altDescriprion}
        photoDesc={photoDesc}
        placement={placement}
        textButton={textButton}
        handleVisibleButtonChangeFalse={handleVisibleButtonChangeFalse}
      >
        <Button
          data-test="downloadButton"
          className="download-button__btn"
          onClick={handleVisibleButtonChange}
        >
          <Icon
            data-test="downloadButtonIcon"
            className="download-button__icon"
            type="download"
          />
          { textButton && <div className="download-button__text">{ textButton }</div> }
        </Button>
      </DownloadSizesPopover>
    </div>
  );
});

DownLoadButton.propTypes = {
  userID: PropTypes.string,
  title: PropTypes.string,
  altDescriprion: PropTypes.string,
  photoDesc: PropTypes.string,
  placement: PropTypes.string,
  textButton: PropTypes.string,
  photoUrlSizes: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    value: PropTypes.string,
  })),
};
DownLoadButton.defaultProps = {
  userID: '',
  title: '',
  altDescriprion: '',
  photoDesc: '',
  placement: '',
  textButton: '',
  photoUrlSizes: [],
};

export default DownLoadButton;
