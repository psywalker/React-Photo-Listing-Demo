import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Icon,
  Popover,
} from 'antd';
import handleDowloadPhoto from '../../utils/handleDowloadPhoto';
import { PHOTO_SIZE_NAMES } from '../../constants';
import './index.scss';

const DownLoadButton = memo(({
  altDescriprion,
  photoDesc,
  placement,
  textButton = null,
  photoUrlSizes,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { t } = useTranslation();
  const downLoadPhoto = (url) => {
    const photoName = handleDowloadPhoto(altDescriprion, photoDesc);
    saveAs(url, photoName);
  };

  const handleVisibleChange = (visible) => {
    setPopupVisible(visible);
  };
  const hidePopover = () => {
    setPopupVisible(false);
  };
  return (
    <div
      data-test="downloadButtonContainer"
      className="download-button"
    >
      <Popover
        className="download-button__popover"
        data-test="photoCardPopover"
        placement={placement}
        title={t('changePhotoSize')}
        visible={popupVisible}
        onVisibleChange={handleVisibleChange}
        content={(
          <div className="download-button__popup download-sizes">
            { photoUrlSizes.map((item, i) => (
              <Button
                className="download-sizes__btn"
                size="small"
                onClick={() => { 
                  downLoadPhoto(item);
                  hidePopover();
                }}
              >
                {t(`photoSizeNames.${PHOTO_SIZE_NAMES[i]}`)}
              </Button>
            ))}
          </div>
        )}
        trigger="click"
      >
        <Button
          data-test="downloadButton"
          className="download-button__btn"
        >
          <Icon
            data-test="downloadButtonIcon"
            className="download-button__icon"
            type="download"
          />
          { textButton && <div className="download-button__text">{ textButton }</div> }
        </Button>
      </Popover>
    </div>
  );
});

DownLoadButton.propTypes = {
  altDescriprion: PropTypes.string,
  photoDesc: PropTypes.string,
  placement: PropTypes.string,
  textButton: PropTypes.string,
  photoUrlSizes: PropTypes.arrayOf(PropTypes.string),
};
DownLoadButton.defaultProps = {
  altDescriprion: '',
  photoDesc: '',
  placement: '',
  textButton: '',
  photoUrlSizes: [],
};

export default DownLoadButton;
