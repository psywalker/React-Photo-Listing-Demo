import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PhotoCardImg from '../PhotoCardImg';
import PhotoCardTags from '../PhotoCardTags';
import './index.scss';

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

    <PhotoCardTags
      onSearchTagValue={onSearchTagValue}
      tags={item.tags}
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
