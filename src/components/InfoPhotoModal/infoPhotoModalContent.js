import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Divider, Icon } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment-timezone';
import numeral from 'numeral';

export const getDate = lastUpdateInfo => moment(lastUpdateInfo).format('LL');
export const getViewsFormat = views => numeral(views).format('0,0');
export const getDownloadsFormat = downloads => numeral(downloads).format('0,0');
export const getLikesFormat = likes => numeral(likes).format('0,0');

const InfoPhotoModalContent = memo(({
  lastUpdateInfo,
  photoDesc,
  views,
  downloads,
  likes,
  cameraMake,
  focalLength,
  aperture,
  shutterspeed,
  iso,
  cameraModel,
  width,
  height,
}) => {
  const { t } = useTranslation();
  const date = getDate(lastUpdateInfo);
  const viewsFormat = getViewsFormat(views);
  const downloadsFormat = getDownloadsFormat(downloads);
  const likesFormat = getLikesFormat(likes);
  const photoModalHeader = (
    <header
      data-test="photoInfoHeader"
      className="photo-info__header"
    >
      <h2
        data-test="photoInfoTitle"
        className="photo-info__title"
      >
        { t('photoInfo.info') }
      </h2>
      { photoDesc && (
        <p className="photo-info__desc">
          <i>
            <b data-test="photoInfoDesc">
              {photoDesc}
            </b>
          </i>
        </p>
      )}
      <p
        data-test="photoInfoDate"
        className="photo-info__date"
      >
        { t('photoInfo.published') }
        {' '}
        {date}
      </p>
    </header>
  );

  const photoModalContent = (
    <div
      data-test="photoInfoContent"
      className="photo-info__content"
    >
      <ul
        data-test="photoInfoListHead"
        className="photo-info__list-head photo-info-list-head"
      >
        <li
          data-test="photoInfoListHeadItem"
          className="photo-info-list-head__item"
        >
          <h3
            data-test="photoInfoListHeadTitle"
            className="photo-info-list-head__title"
          >
            <Icon type="eye" />
            {' '}
            { t('photoInfo.views') }
          </h3>
          <p
            data-test="photoInfoListHeadTextMain"
            className="photo-info-list-head__text-main"
          >
            {viewsFormat}
          </p>
          <p
            data-test="photoInfoListHeadText"
            className="photo-info-list-head__text"
          >
            {''}
          </p>
        </li>
        <li
          data-test="photoInfoListHeadItem"
          className="photo-info-list-head__item"
        >
          <h3
            data-test="photoInfoListHeadTitle"
            className="photo-info-list-head__title"
          >
            <Icon type="arrow-down" />
            {' '}
            { t('photoInfo.downloads') }
          </h3>
          <p
            data-test="photoInfoListHeadTextMain"
            className="photo-info-list-head__text-main"
          >
            {downloadsFormat}
          </p>
          <p
            data-test="photoInfoListHeadText"
            className="photo-info-list-head__text"
          >
            {''}
          </p>
        </li>
        <li
          data-test="photoInfoListHeadItem"
          className="photo-info-list-head__item"
        >
          <h3
            data-test="photoInfoListHeadTitle"
            className="photo-info-list-head__title"
          >
            <Icon type="heart" />
            {' '}
            { t('photoInfo.likes') }
          </h3>
          <p
            data-test="photoInfoListHeadTextMain"
            className="photo-info-list-head__text-main"
          >
            {likesFormat}
          </p>
          <p
            data-test="photoInfoListHeadText"
            className="photo-info-list-head__text"
          >
            {''}
          </p>
        </li>
      </ul>

      <Divider />

      <ul
        data-test="photoInfoListContent"
        className="photo-info-list photo-info__list-content"
      >
        <li
          data-test="photoInfoListItem"
          className="photo-info-list__item"
        >
          <h3
            data-test="photoInfoListTitle"
            className="photo-info-list__title"
          >
            { t('photoInfo.cameraMake') }
          </h3>
          <p
            data-test="photoInfoListText"
            className="photo-info-list__text"
          >
            {cameraMake || '--'}
          </p>
        </li>
        <li
          data-test="photoInfoListItem"
          className="photo-info-list__item"
        >
          <h3
            data-test="photoInfoListTitle"
            className="photo-info-list__title"
          >
            { t('photoInfo.cameraModel') }
          </h3>
          <p
            data-test="photoInfoListText"
            className="photo-info-list__text"
          >
            {cameraModel || '--'}
          </p>
        </li>
        <li
          data-test="photoInfoListItem"
          className="photo-info-list__item"
        >
          <h3
            data-test="photoInfoListTitle"
            className="photo-info-list__title"
          >
            { t('photoInfo.focalLength') }
          </h3>
          <p
            data-test="photoInfoListText"
            className="photo-info-list__text"
          >
            {focalLength || '--'}
          </p>
        </li>
        <li
          data-test="photoInfoListItem"
          className="photo-info-list__item"
        >
          <h3
            data-test="photoInfoListTitle"
            className="photo-info-list__title"
          >
            { t('photoInfo.aperture') }
          </h3>
          <p
            data-test="photoInfoListText"
            className="photo-info-list__text"
          >
            {aperture || '--'}
          </p>
        </li>
        <li
          data-test="photoInfoListItem"
          className="photo-info-list__item"
        >
          <h3
            data-test="photoInfoListTitle"
            className="photo-info-list__title"
          >
            { t('photoInfo.shutterSpeed') }
          </h3>
          <p
            data-test="photoInfoListText"
            className="photo-info-list__text"
          >
            {shutterspeed || '--'}
          </p>
        </li>
        <li
          data-test="photoInfoListItem"
          className="photo-info-list__item"
        >
          <h3
            data-test="photoInfoListTitle"
            className="photo-info-list__title"
          >
            { t('photoInfo.iso') }
          </h3>
          <p
            data-test="photoInfoListText"
            className="photo-info-list__text"
          >
            {iso || '--'}
          </p>
        </li>
        <li
          data-test="photoInfoListItem"
          className="photo-info-list__item"
        >
          <h3
            data-test="photoInfoListTitle"
            className="photo-info-list__title"
          >
            { t('photoInfo.dimensions') }
          </h3>
          <p
            data-test="photoInfoListText"
            className="photo-info-list__text"
          >
            {(width && height) ? `${width} x ${height}` : '--' }
          </p>
        </li>
      </ul>
    </div>
  );
  return (
    <div
      data-test="photoInfo"
      className="photo-info"
    >
      { photoModalHeader }
      { photoModalContent }
    </div>
  );
});

InfoPhotoModalContent.propTypes = {
  lastUpdateInfo: PropTypes.string,
  photoDesc: PropTypes.string,
  views: PropTypes.number,
  downloads: PropTypes.number,
  likes: PropTypes.number,
  cameraMake: PropTypes.string,
  focalLength: PropTypes.string,
  aperture: PropTypes.string,
  shutterspeed: PropTypes.string,
  iso: PropTypes.number,
  cameraModel: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

InfoPhotoModalContent.defaultProps = {
  lastUpdateInfo: '',
  photoDesc: '',
  views: 0,
  downloads: 0,
  likes: 0,
  cameraMake: '',
  focalLength: '',
  aperture: '',
  shutterspeed: '',
  iso: 0,
  cameraModel: '',
  width: 0,
  height: 0,
};

export default InfoPhotoModalContent;
