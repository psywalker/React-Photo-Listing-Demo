import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Divider,
  Popover,
} from 'antd';
import handleDowloadPhoto from '../../utils/handleDowloadPhoto';
import handleVisibleByScroll from '../../utils/handleVisibleByScroll';
import './index.scss';

const DownloadSizesPopover = memo(({
  photoUrlSizes,
  userID,
  title,
  altDescriprion,
  photoDesc,
  placement,
  children,
  handleVisibleButtonChangeFalse,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { t } = useTranslation();
  const downLoadPhoto = (url) => {
    const photoName = handleDowloadPhoto(altDescriprion, photoDesc);
    saveAs(url, photoName);
  };

  const handleVisibleChange = (visible) => {
    setPopupVisible(visible);
    if (!visible) handleVisibleButtonChangeFalse();
  };
  const hidePopover = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    handleVisibleByScroll('addEventListener', ['scroll', 'resize'], [hidePopover, handleVisibleButtonChangeFalse]);
    return () => {
      handleVisibleByScroll('removeEventListener', ['scroll', 'resize'], [hidePopover, handleVisibleButtonChangeFalse]);
    };
  });

  return (
    <Popover
      overlayClassName="download-button__popover download-button-popover"
      data-test="photoCardPopover"
      placement={placement}
      title={t('changePhotoSize')}
      visible={popupVisible}
      onVisibleChange={handleVisibleChange}
      content={(
        <div className="download-button__popup download-sizes">
          { photoUrlSizes.map(item => (
            <Button
              key={item.value}
              className="download-sizes__btn"
              size="small"
              onClick={() => {
                downLoadPhoto(item.url);
                hidePopover();
                handleVisibleButtonChangeFalse();
              }}
            >
              {t(item.value)}
            </Button>
          ))}
          <Divider style={{ margin: '5px 0' }} />
          <div className="download-sizes__footer credit">
            {t('photoBy')}
            {' '}
            <a
              href={`https://unsplash.com/@${userID}?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
            {' '}
            {t('photoOn')}
            {' '}
            <a
              href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
          </div>
        </div>

      )}
      trigger="click"
    >
      { children }
    </Popover>
  );
});

DownloadSizesPopover.propTypes = {
  userID: PropTypes.string,
  title: PropTypes.string,
  altDescriprion: PropTypes.string,
  photoDesc: PropTypes.string,
  placement: PropTypes.string,
  photoUrlSizes: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    value: PropTypes.string,
  })),
  handleVisibleButtonChangeFalse: PropTypes.func,
  children: PropTypes.shape({}),
};

DownloadSizesPopover.defaultProps = {
  userID: '',
  title: '',
  altDescriprion: '',
  photoDesc: '',
  placement: '',
  photoUrlSizes: [],
  handleVisibleButtonChangeFalse: () => {},
  children: {},
};

export default DownloadSizesPopover;
