import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PhotoCardImg from '../PhotoCardImg';
import './index.scss';

export const getTagsVisibleArr = item => (
  item.tags.length < 4
    ? item.tags
    : item.tags.slice(0, 3)
);

export const getTagsHiddenArr = item => (
  item.tags.length > 3
    ? item.tags.slice(3)
    : false
);

const PhotoCard = memo(({
  onSearchTagValue,
  getPaginationChange,
  item,
}) => (
  <li className="photo-card-list__item">
    <PhotoCardImg
      photoID={item.photoID}
      photoAltDesc={item.photoAltDesc}
      photoName={item.photoName}
    />
  </li>
));


PhotoCard.propTypes = {
  onSearchTagValue: PropTypes.func,
  getPaginationChange: PropTypes.func,
  item: PropTypes.shape({}),
};
PhotoCard.defaultProps = {
  onSearchTagValue: () => {},
  getPaginationChange: () => {},
  item: {},
};

export default PhotoCard;
